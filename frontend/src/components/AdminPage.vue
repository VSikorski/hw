<template>
  <div class="admin-page">
    <h6>Admin Page</h6>
    <label for="upload-series-file">Import series (CSV)</label>
    <input type="file" name="upload-series-file" id="upload-series-file" @change="fileChange" />
    <div>
      <label><input type="radio" name="options" value="series" v-model="selectedOption" />Series</label>
      <label><input type="radio" name="options" value="diecast" v-model="selectedOption" />Diecast</label>
    </div>

    <button @click="fileUpload">Submit</button>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p v-if="responseMessage">{{ responseMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminPage',
  data() {
    return {
      selectedOption: 'series',
      selectedFile: null,
      errorMessage: '',
      responseMessage: ''
    };
  },
  methods: {
    fileChange(event) {
      this.selectedFile = event.target.files[0]; 
    },
    async fileUpload() {
      if (!this.selectedFile) {
        this.errorMessage = "Please select a file";
        return;
      }

      if (this.selectedFile && !this.selectedFile.name.endsWith('.csv')) {
        this.errorMessage = "Please select a CSV file format";
        return;
      }

      let objects;
      try {
        objects = await this.parseCSVtoObjects(this.selectedFile);
      } catch (error) {
        this.errorMessage = error.message;
        return;
      }

      if (!objects) {
        this.errorMessage = 'File cannot be empty';
      }

      console.log("Parsed Objects:", JSON.stringify(objects, null, 2));

      const endpoints = {
        series: 'http://localhost:3000/api/post/series/bulk',
        diecast: 'http://localhost:3000/api/post/cars/bulk'
      };
      const endpoint = endpoints[this.selectedOption];

      try {
        const response = await axios.post(endpoint, objects, {
          headers: {
            Accept: 'application/json'
          },
        });
        if (response.status === 201) {
          this.responseMessage = 'Data added successfully!';
          this.errorMessage = '';
          } else {
            this.errorMessage = JSON.stringify(response, null, 2);
            this.responseMessage = '';
          }
          console.log(response);
        } catch (error) {
          if (error.response) {
            this.errorMessage = JSON.stringify(error.response.data, null, 2);
          } else {
            this.errorMessage = error.message;
          }
          this.responseMessage = '';
        }

    },
    parseCSVtoObjects(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
          reader.onload = (e) => {
          const data = e.target?.result;

          if (!data) {
            reject(new Error("File cannot be empty"));
            return;
          }

          const lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
          if (lines.length < 2) {
            reject(new Error("Empty file or no data"));
            return;
          }

          const header = lines[0].split(',');

          const objectsData = lines.slice(1).map(line => {
            const values = line.split(',');
            const entry = {};
            header.forEach((hd, idx) => {
              entry[hd] = values[idx];
            });
            return entry;
          });

          resolve(objectsData);
        };

        reader.onerror = () => {
          reject(new Error("Error reading the file"));
        };

        reader.readAsText(file);
      });
    }
  }
}
</script>

<style scoped>
</style>
