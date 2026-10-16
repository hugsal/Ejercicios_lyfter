import { Formik, Form, Field } from "formik";
import { productValidationSchema } from "../schemas/productSchema";

function ProductForm({
  initialValues,
  onSubmit,
  errorMessage,
  className,
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={productValidationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, submitCount }) => (
        <Form className={className}>
          <div className="form-group">
            <label htmlFor="productName">Nombre</label>
            <Field
              id="productName"
              name="name"
              placeholder="Ej: Pelota de Juguete Resistente"
            />
          </div>
          <div className="form-group">
            <label htmlFor="productDescription">Descripción</label>
            <Field
              as="textarea"
              rows={3}
              id="productDescription"
              name="description"
              placeholder="Una descripción detallada del producto..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="productCategory">Categoría</label>
            <Field
              type="text"
              id="productCategory"
              name="category"
              placeholder="Ej: Juguetes"
            />
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Precio</label>
            <Field
              type="number"
              id="productPrice"
              name="price"
              placeholder="Ej: 19.99"
              step="0.01"
              min="0.01"
            />
          </div>
          <div className="form-group">
            <label htmlFor="productImage">URL de la imagen</label>
            <Field
              type="url"
              id="productImage"
              name="image"
              placeholder="Ej: https://example.com/image.jpg"
            />
          </div>
          <div className="form-group">
            <label htmlFor="productStock">Stock</label>
            <Field
              type="number"
              id="productStock"
              name="stock"
              placeholder="Ej: 50"
              min="0"
              step="1"
            />
          </div>
          {submitCount > 0 && Object.keys(errors).length > 0 && (
            <p className="form-error-general">{errorMessage}</p>
          )}
          {children}
        </Form>
      )}
    </Formik>
  );
}
export default ProductForm;
