<template>
  <div class="container mt-5">
    <h1 class="text-center">Student List</h1>

    <!-- v-if block for editing student -->
    <div v-if="Object.keys(currentStudent).length !== 0">
      <h1>Edit Student</h1>
      <form @submit.prevent="updateStudent(currentStudent.id)">
        <div class="mb-3 mt-5 col-6">
          <input type="email" class="form-control" placeholder="Email" v-model="currentStudent.email" />
        </div>
        <div class="mb-3 col-6">
          <input type="text" class="form-control" placeholder="Course" v-model="currentStudent.course" />
        </div>
        <div class="mb-3 col-6">
          <input type="text" class="form-control" placeholder="Name" v-model="currentStudent.name" />
        </div>
        <div class="mb-3 col-6">
          <input type="text" class="form-control" placeholder="Gender" v-model="currentStudent.gender" />
        </div>
        <button type="submit" class="btn btn-primary">Update</button>
      </form>
    </div>

    <!-- v-else block for creating student -->
    <div v-else>
      <h4 class="text-center">Create Student</h4>
      <form @submit.prevent="saveStudent">
        <div class="mb-3 mt-5 col-6">
          <input type="email" class="form-control" placeholder="Email" v-model="student.email" />
        </div>
        <div class="mb-3 col-6">
          <input type="text" class="form-control" placeholder="Course" v-model="student.course" />
        </div>
        <div class="mb-3 col-6">
          <input type="text" class="form-control" placeholder="Name" v-model="student.name" />
        </div>
        <div class="mb-3 col-6">
          <input type="text" class="form-control" placeholder="Gender" v-model="student.gender" />
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>

    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Course</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in students" :key="student.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ student.name }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.course }}</td>
            <td>{{ student.gender }}</td>
            <td>
              <button class="btn btn-warning me-1" @click="editStudent(student.id)">Edit</button>
              <button class="btn btn-danger" @click="deleteStudent(student.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['students', 'currentStudent', 'student'])
  },
  methods: {
    ...mapActions(['fetchStudents', 'saveStudent', 'editStudent', 'updateStudent', 'deleteStudent'])
  },
  mounted() {
    this.fetchStudents();
  }
};
</script>
