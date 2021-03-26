import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import useAddress from "../../../hooks/useAddress";
import useWindowSize from "../../../hooks/useWindowSize";
import Order from "../../../components/shop/checkout/Order";

// Icon
import check from "../../../assets/icons/icon-check.svg";

function Personal({ location }) {
  /* Props :
    - location.state.isPaying : true if user comes from /shop/cart.
  */

  const [additional, setAdditional] = useState("");
  const [remember, setRemember] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const { currentUser } = useAuth();
  const { windowSize } = useWindowSize();
  const {
    handleAddAddress,
    getAddresses,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    address,
    setAddress,
    city,
    setCity,
    zipCode,
    setZipCode,
    country,
    setCountry,
    email,
    setEmail,
    phone,
    setPhone,
  } = useAddress();
  const history = useHistory();

  // If the user is logged in, they might have saved addresses.
  // We display them so that they can checkout faster.
  useEffect(() => {
    if (currentUser.isAnonymous) return;
    (async () => {
      const addresses = await getAddresses(currentUser.uid);
      setAddresses(addresses);
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (remember) {
      handleAddAddress(currentUser.uid);
    }

    history.push({
      pathname: "/shop/payment",
      state: {
        personal: {
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          zipCode,
          country,
        },
      },
    });
  };

  return (
    <>
      {/* If the user didn't access to this page via the cart links,
       - Redirect them to their cart.
       - Otherwise, ask for their personal details. */}
      {location.state ? (
        <Container>
          <Content>
            <Form onSubmit={handleSubmit}>
              <Heading>Personal Details</Heading>

              {!currentUser.isAnonymous && addresses.length !== 0 && (
                <>
                  <Subheading>Address Book</Subheading>
                  <Addresses>
                    {addresses.map((address) => {
                      return (
                        <div key={address.id}>
                          <div>
                            {address.firstName} {address.lastName}
                          </div>
                          <div>{address.address}</div>
                          <div>
                            {address.zipCode} {address.city}
                          </div>
                          <div>{address.country}</div>
                          <Button
                            onClick={() => {
                              history.push({
                                pathname: "/shop/payment",
                                state: {
                                  personal: {
                                    firstName: address.firstName,
                                    lastName: address.lastName,
                                    address: address.address,
                                    zipCode: address.zipCode,
                                    country: address.country,
                                    city: address.city,
                                    email: address.email,
                                    phone: address.phone,
                                    additional,
                                  },
                                },
                              });
                            }}
                          >
                            Use this address
                          </Button>
                        </div>
                      );
                    })}
                  </Addresses>

                  <Subheading>Use another address</Subheading>
                </>
              )}

              <CategoryName>General</CategoryName>
              <Category>
                <Field>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    type="text"
                    value={firstName}
                    id="first_name"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </Field>

                <Field>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    type="text"
                    value={lastName}
                    id="last_name"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </Field>

                <Field>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </Field>

                <Field>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    required
                  />
                </Field>
              </Category>

              <CategoryName>Delivery</CategoryName>
              <Category>
                <Field>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                    required
                  />
                </Field>

                <Field>
                  <Label htmlFor="zip_code">Zip Code</Label>
                  <Input
                    type="text"
                    id="zip_code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Enter your zip code"
                    required
                  />
                </Field>

                <Field>
                  <Label htmlFor="city">City</Label>
                  <Input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city"
                    required
                  />
                </Field>

                <Field>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter your country"
                    required
                  />
                </Field>

                <FieldLarge>
                  <Label htmlFor="additional">Additional Informations</Label>
                  <Input
                    type="text"
                    id="additional"
                    value={additional}
                    onChange={(e) => setAdditional(e.target.value)}
                    placeholder="Anything else you would like to tell us (building entrance codes, prefered delivery time...)"
                  />
                </FieldLarge>
              </Category>

              {currentUser && !currentUser.isAnonymous && (
                <>
                  <CheckboxLabel htmlFor="remember" isChecked={remember}>
                    Remember my informations for easier checkout.
                  </CheckboxLabel>
                  <Checkbox
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                </>
              )}

              <Button type="submit">Proceed to Payment</Button>
            </Form>
            {windowSize.width > 900 && <Order />}
          </Content>
        </Container>
      ) : (
        <Redirect to="/shop/cart" />
      )}
    </>
  );
}

export default Personal;

Personal.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      isPaying: PropTypes.bool,
    }),
  }).isRequired,
};

// Styled Components
const colors = {
  primary: "hsl(0, 0%, 45%)", // Grey
  secondary: "hsl(0, 0%, 27%)", // Button and checkbox
  tertiary: "hsl(0, 0%, 90%)",
  input: "hsl(0, 0%, 70%)", // Input lines
  black: "hsl(0, 0%, 0%)",
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 5rem 0;

  @media all and (min-width: 576px) {
    margin: 5rem;
  }
`;

const Content = styled.div`
  width: 80%;

  @media all and (min-width: 900px) {
    display: flex;
    align-items: start;
    max-width: 1400px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 40vw;
`;

const Category = styled.div`
  display: grid;
  grid-gap: 3rem 5rem;
  margin: 1.25rem 0 3rem 0;

  @media all and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CategoryName = styled.div`
  grid-column: 1 / -1;
  border-bottom: 1px solid ${colors.tertiary};
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.primary};
  padding-bottom: 0.25rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldLarge = styled(Field)`
  grid-column: 1 / -1;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  font-family: "Source Sans Pro", sans-serif;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.tertiary};
  background: ${colors.secondary};
  align-self: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const Label = styled.label`
  text-transform: uppercase;
  font-size: 0.825rem;
  letter-spacing: 1px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${colors.input};
  padding: 0.5rem 0 0.25rem 0;
  font-family: "Source Sans Pro", sans-serif;

  &::placeholder {
    color: ${colors.input};
  }

  &:focus {
    border-bottom: 1px solid ${colors.black};
  }
`;

const Checkbox = styled.input`
  visibility: hidden;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;

  &:before {
    display: inline-block;
    content: "";
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    border-radius: 2px;
    border: 1px solid ${colors.secondary};
    background-color: ${(props) => (props.isChecked ? colors.secondary : "")};
    background-image: ${(props) => (props.isChecked ? `url(${check})` : "")};
    background-position: ${(props) => (props.isChecked ? "center" : "")};
  }
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: "Playfair Display", sans-serif;
`;

const Subheading = styled.div`
  border-bottom: 1px solid ${colors.black};
  text-transform: uppercase;
  color: ${colors.black};
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
`;

// Address Book

const Addresses = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-bottom: 2.5rem;
`;
