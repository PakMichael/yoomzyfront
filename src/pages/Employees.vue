<template>
  <div id="employees-root-wrapper">
    <div class="panel vertical">
      <div class="panel-body-red">
        <h4>add employee</h4>
      </div>
      <form id="add-employee-wrap" @submit.prevent="addEmployee" class="form">
        <div class="form-group">
          <label for="">employee email address</label
          ><input type="email" placeholder="email" v-model="newEmployeeEmail" />
        </div>
        <div class="form-group submit">
          <button class="button">Add employee</button>
        </div>
      </form>
    </div>
    <div class="panel vertical">
      <div class="panel-body-red">
        <h4>employees list</h4>
      </div>
      <table class="base-table employees">
        <thead>
          <tr>
            <th>employee email</th>
            <th class="active">is active?</th>
            <th class="actions">remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(a, index) in allEmployees" :key="a.username">
            <td>
              <router-link
                id="employee-username"
                :to="{
                  name: 'EmployeeAnalytics',
                  params: { employee: a.username },
                }"
                >{{ a.username }}</router-link
              >
            </td>
            <td class="employee-status">
              <span v-if="a.is_active" class="active">active</span>
              <span v-if="!a.is_active" class="inactive">inactive</span>
            </td>
            <td>
              <a
                id="remove-employee"
                @click="removeEmployeeModal(a.username)"
                class="button-small"
                >click to remove</a
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Employees",
  data: function () {
    return {
      newEmployeeEmail: "",
      allEmployees: [],
    };
  },
  methods: {
    removeEmployeeModal(worker_username) {
      let callbacks = {
        Remove: () => {
          this.removeEmployeeConfirm(worker_username);
          this.$store.commit("modal", [
            true,
            `Employee ${worker_username} removed`,
            {},
          ]);
        },
      };
      this.$store.commit("modal", [
        true,
        "Are you sure you want to remove this employee?",
        callbacks,
      ]);
    },
    removeEmployeeConfirm(worker_username) {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };

      let data = {
        worker_username: worker_username,
      };
      this.$axios
        .delete(`//${process.env.VUE_APP_ENDPOINT_HOST}/api/employees`, {
          headers,
          data,
        })
        .then((value) => {
          let filtered = this.allEmployees.filter((item) => {
            if (item.username !== worker_username) {
              return item;
            }
          });
          this.allEmployees = filtered;
     
          this.$store.commit("modal", [
            true,
            "Employee deleted",
            { callbacks },
          ]);
        })
        .catch(this.$proccessRequestError);
    },
    addEmployee() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };

      let data = {
        email: this.newEmployeeEmail,
      };
      this.$axios
        .post(
          `//${process.env.VUE_APP_ENDPOINT_HOST}/api/employees`,
          data,
          config
        )
        .then((value) => {
          this.allEmployees.push({ username: this.newEmployeeEmail });
          this.$store.commit("modal", [
            true,
            `${this.newEmployeeEmail} added as employee`,
            {},
          ]);
        })
        .catch(this.$proccessRequestError);
    },
    getEmployees() {
      let headers = {
        ...this.$headers,
        Authorization: `Token ${this.$store.state.token}`,
      };
      let config = { headers };

      this.$axios
        .get(`//${process.env.VUE_APP_ENDPOINT_HOST}/api/employees`, config)
        .then((value) => {
          console.log(value);
          this.allEmployees = value.data;
        })
        .catch(this.$proccessRequestError);
    },
  },
  beforeMount() {
    this.getEmployees();
  },
};
</script>
