import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useApi } from "../hooks/useApi";
import apiServices from "../api/apiServices";
import Loading from "../components/Loading";

function Checkout() {
  const navigate = useNavigate();
  const {
    data: cart = {},
    loading,
    error,
  } = useApi(() => apiServices.getActiveCart());

  if (loading) return <Loading />;

  if (cart.items && cart.items.length === 0) {
    return (
      <section className="empty-state">
        <svg
          className="empty-icon"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="10" />
          <path
            strokeLinecap="round"
            d="M9 10h.01M15 10h.01M16 16c-.8-1.2-2.1-2-4-2s-3.2.8-4 2"
          />
        </svg>
        <h3>No hay productos en el carrito.</h3>
      </section>
    );
  }

  const { id: cartId, totalAmount = 0 } = cart;

  const validationSchema = Yup.object({
    fullName: Yup.string().required().min(3),
    email: Yup.string().email().required(),
    billingAddress: Yup.string().required().min(5),
    phone: Yup.string().required().min(8),
  });

  return (
    <div className="checkout-layout">
      <section className="checkout-card">
        <h2>Información de compra</h2>
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            billingAddress: "",
            phone: "",
            paymentReference: "SINPE",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              await apiServices.createSale({ cartId, ...values });
              alert("Compra realizada exitosamente");
              navigate("/productos");
            } catch (error) {
              console.error(error.message);
            }
          }}
        >
          {({ errors, submitCount }) => (
            <Form id="checkoutForm">
              <div className="form-group">
                <label htmlFor="fullName">Nombre completo</label>
                <Field
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Ingresa tu nombre completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Correo electrónico</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Dirección</label>
                <Field
                  type="text"
                  id="address"
                  name="billingAddress"
                  placeholder="Dirección de entrega"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+506 0000-0000"
                />
              </div>
              {submitCount > 0 && Object.keys(errors).length > 0 && (
                <p className="checkout-note">
                  Completa todos los campos correctamente para procesar su
                  compra.
                </p>
              )}

              <p className="checkout-note">
                Esta información se utilizará para completar la compra.
              </p>
            </Form>
          )}
        </Formik>
      </section>

      <section className="checkout-card">
        <h2>Resumen del pedido</h2>

        <div className="order-summary-list" id="cartContent">
          {cart.items.map(({ product, quantity }) => (
            <div key={product.id} className="order-summary-item">
              <div className="order-item-info">
                <span className="order-item-title">{product.name}</span>
                <span className="order-item-detail">
                  {quantity} x {product.price}
                </span>
              </div>
              <span className="order-item-price">${product.price}</span>
            </div>
          ))}
        </div>

        <hr className="order-divider" />

        <div className="order-total-row">
          <span className="order-total-label">Total:</span>
          <span className="order-total-amount">${totalAmount}</span>
        </div>

        <div className="checkout-actions">
          <button type="submit" form="checkoutForm" className="btn-primary">
            Confirmar compra
          </button>
          <Link to="/productos" className="btn-secondary">
            Cancelar
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Checkout;
