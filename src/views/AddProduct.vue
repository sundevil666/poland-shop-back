<template>
  <div>
    <h1>Add Product</h1>
    <form>
      <the-input label="Product name" placeholder="Product Name" tyepInput="text" />
      <the-input label="Photo" typeInput="file" />

      <div class="row">
        <div class="col-3"><the-input label="Ofer" placeholder="Ofer" tyepInput="text" /></div>
        <div class="col-3"><the-input label="Code" placeholder="Code" tyepInput="text" /></div>
        <div class="col-3"><the-input label="Price" placeholder="Price" tyepInput="text" /></div>
        <div class="col-3"><the-input label="First Price" placeholder="First Price" tyepInput="text" /></div>
      </div>
      <div class="row">
        <div class="col-4">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Category</label>
            <select class="form-select" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div class="col-3"><the-input label="Label" placeholder="Label" tyepInput="text" /></div>
        <div class="col-3"><the-input label="Mark" placeholder="Mark" tyepInput="text" /></div>
        <div class="col-2">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Status
            </label>
          </div>
        </div>
      </div>


      <div class="form-floating mb-3">
        <textarea class="form-control" placeholder="Description" id="floatingTextarea2" style="height: 100px"></textarea>
        <label for="floatingTextarea2">Description</label>
      </div>
      <the-button label="Add Product" />
    </form>
  </div>
</template>

<script>
export default {
  name: "AddProduct"
}
</script>

<style scoped>

</style>
