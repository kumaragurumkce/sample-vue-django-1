import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    students: [],
    currentStudent: {},
    api: 'http://127.0.0.1:8000/api',
    student: {
      name: '',
      course: '',
      email: '',
      gender: ''
    }
  },
  mutations: {
    SET_STUDENTS(state, students) {
      state.students = students;
    },
    SET_CURRENT_STUDENT(state, student) {
      state.currentStudent = student;
    },
    RESET_CURRENT_STUDENT(state) {
      state.currentStudent = {};
    },
    RESET_NEW_STUDENT(state) {
      state.student = { name: '', course: '', email: '', gender: '' };
    }
  },
  actions: {
    fetchStudents({ commit, state }) {
      axios.get(state.api + '/students/')
        .then(response => {
          commit('SET_STUDENTS', response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveStudent({ dispatch, commit, state }) {
      axios.post(state.api + '/students/', state.student)
        .then(() => {
          dispatch('fetchStudents');
          commit('RESET_NEW_STUDENT');
        })
        .catch(error => {
          console.log(error);
        });
    },
    editStudent({ commit, state }, id) {
      const student = state.students.find(student => student.id === id);
      if (student) {
        commit('SET_CURRENT_STUDENT', { ...student });
      }
    },
    updateStudent({ dispatch, commit, state }, id) {
      axios.put(state.api + `/students/${id}/`, state.currentStudent)
        .then(() => {
          dispatch('fetchStudents');
          commit('RESET_CURRENT_STUDENT');
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteStudent({ dispatch, state }, id) {
      axios.delete(state.api + `/students/${id}/`)
        .then(() => {
          dispatch('fetchStudents');
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  getters: {
    students: state => state.students,
    currentStudent: state => state.currentStudent,
    student: state => state.student
  }
});
