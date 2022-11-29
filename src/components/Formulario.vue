<template>

  <section class="src-componentes-formulario-av">
    <div class="jumbotron">
      <h2>Formulario - Ingreso de Gastos</h2>
      <hr>
      <hr>
      <br>

  <vue-form :state="formState" @submit.prevent="enviar()">
    
        <!-- --------------------------- Campo Nombre ---------------------------- -->
        <validate tag="div">
          <label for="nombre">Nombre</label>
          <input 
            id="nombre"
            class="form-control"
            type="text" 
            v-model.trim="formData.nombre" 
            required 
            name="nombre"
            autocomplete="off"
          />
          <!-- Validación -->
          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
          </field-messages>
        </validate>
        <br>

        <!-- --------------------------- Campo Descripcion ---------------------------- -->
        <validate tag="div">
          <label for="descripcion">Descripcion</label>
          <input 
            id="descripcion"
            class="form-control"
            type="text" 
            v-model.trim="formData.descripcion" 
            required 
            name="descripcion"
            autocomplete="off"
          />
          <!-- cartel de validación -->
          <field-messages name="descripcion" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
          </field-messages>
        </validate>
        <br>
    
        <!-- --------------------------- Campo Importe ---------------------------- -->
        <validate tag="div">
          <label for="importe">importe</label>
          <input 
            id="importe"
            class="form-control"
            type="number" 
            v-model.number="formData.importe" 
            required 
            name="importe"
            autocomplete="off"
            solo-numeros
          />
          <!-- cartel de validación -->
          <field-messages name="importe" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="solo-numeros" class="alert alert-danger mt-1">
              Este campo solo debe contener números</div>
          </field-messages>
        </validate>
        <br>
    
        <!-- -------------------------- Botón de envío ----------------------------- -->
        <button class="btn btn-success my-3" :disabled="formState.$invalid">Enviar</button>
      </vue-form>    
    </div>

    <div class="table-responsive">
  <br>
  <br>
  <table class="table table-dark">
    <tr>
      <th>Nombre</th>
      <th>Descripción</th>
      <th>Importe</th>
      <th>Fecha</th>
    </tr>

    <tr v-for="(ingreso, index) in ingresos" :key="index">
      <td>{{ ingreso.nombre }}</td>
      <td>{{ ingreso.descripcion }}</td>
      <td>{{ "$" + ingreso.importe }}</td>
      <td>{{ convertirFyH(ingreso.createdAt) }}</td>
    </tr>

    <tr>
      <th>Suma Total</th>
    </tr>
    <tr>
      <td>$ {{importeTotal}}</td>
    </tr>
  </table>
  <p>
    Respuestas:
    1) B
    2) B
    3) C
    4) B
    5) B
  </p>

</div>

  </section>

</template>

<script>

  export default  {
    name: 'src-components-formulario',
    props: [],
    mounted () {
      this.getPostAxios()
    },
    data () {
      return {
        url: "https://638686c1d9b24b1be3da0d7a.mockapi.io/ingresos",
        importeTotal: 0,
        ingresos: [],
        formState : {},
        formData: this.getInitialData(),
      }
    },
    methods: {
      getInitialData() {
        return {
          nombre: null,
          descripcion: null,
          importe: null,
        }
      },
      enviar() {
        console.log({...this.formData})
        
        let ingreso = {
          nombre: this.formData.nombre, 
          descripcion: this.formData.descripcion, 
          importe: this.formData.importe
        }

        this.postIngreso(ingreso)
        this.importeTotal += this.formData.importe

        this.formData = this.getInitialData()
        this.formState._reset()
      },
      async postIngreso(ingresoNuevo) {
        try {
          await this.axios.post(this.url, ingresoNuevo, { 'content-type' : 'application/json' })
          //let ingreso = response.data
          //this.ingresos.push(ingreso)
        }
        catch(error) {
           console.error('ERROR en posIngreso', error)
        }

      },
      async getPostAxios() {
        try {
          let response = await this.axios(this.url)
          let respuesta = response.data
          console.log(respuesta)
          this.ingresos = respuesta
        }
        catch(error) {
           console.error(error)
        }
      },
      convertirFyH(fyhStr) {
        return new Date(fyhStr).toLocaleString()
      }

    },
    computed: {

    }
}

</script>

<style scoped lang="css">

</style>
