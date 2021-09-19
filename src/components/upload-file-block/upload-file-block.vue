<template>
  <div>
    <input type="file" ref="file" multiple @change="onChange" />
    <div>
      <div v-for="(file, index) in audioFiles" :key="index">
        {{ file.name }} - {{ file.progress }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase/compat';
import { Component, Vue } from 'vue-property-decorator';
import { getDatabase, ref, set } from 'firebase/database';

@Component
export default class extends Vue {
  // Limit how many files can be upload at a same time
  private readonly max: number = 3;
  private audioFiles: Array<{
    file: File;
    progress: number;
    name: string;
    url?: string;
  }> = [];

  private loading: boolean = false;
  private userId: string = '';
  private uploadTime: string = '';

  private onChange(event: any) {
    const files = event.target.files;
    if (files) {
      for (let index = 0; index < files.length && index < this.max; index++) {
        this.handleFileSelect(files[index]);
      }
    }

    event.target.value = '';
  }

  private handleFileSelect(file: File) {
    if (file !== null && this.isAllowedFile(file)) {
      this.audioFiles.push({ file: file, progress: 0, name: file.name });
      this.upload(file);
    } else {
      alert('File is in valid!');
    }
  }

  private isAllowedFile(file: File) {
    if (file && file.type.startsWith('audio')) {
      return true;
    } else {
      return false;
    }
  }

  private findFileIndexByFileName(name: string): number | -1 {
    return this.audioFiles.findIndex(({ file }) => file && file.name === name);
  }

  private async upload(file: File): Promise<void> {
    this.loading = true;
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const firebaseUserId: string = user.uid;
        this.userId = firebaseUserId;
        this.uploadTime = new Date().getTime().toString();
        this.uploadToFirestore(
          file.name + '-' + firebaseUserId + '-' + this.uploadTime,
          file
        );
        // ...
      } else {
        // User is signed out
        // ...
        // For a web application, the default behavior is to persist a user's session even after the user closes the browser.
        // See more: https://firebase.google.com/docs/auth/web/auth-state-persistence
        this.loading = false;
        alert('Error: `uid` is empty');
        await this.$store.dispatch('auth/logOut');
        this.$router.push('/landing');
      }
    });
  }
  private uploadToFirestore(fileName: string, file: File): void {
    const index = this.findFileIndexByFileName(file.name);

    const storageRef: any = firebase.storage().ref(fileName);

    const uploadTask: firebase.storage.UploadTask = storageRef.put(file);
    uploadTask.on(
      'state_changed',
      (snap: any) => {
        const percent: number =
          Math.floor(snap.bytesTransferred / snap.totalBytes) * 100;
        const progress: number = percent === -1 ? 0 : percent;
        this.audioFiles[index].progress = progress;
      },
      null,
      () => this.getAndProcessDownloadUrl(index, storageRef)
    );
  }
  private async getAndProcessDownloadUrl(fileIndex: number, storageRef: any) {
    const fileUrl = await storageRef.getDownloadURL();
    const db = getDatabase();
    set(ref(db, 'users/' + this.userId + '/' + this.uploadTime), {
      fileUrl: fileUrl,
    });
  }
}
</script>

<style scoped></style>
