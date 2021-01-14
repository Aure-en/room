import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Nav from '../../../components/shop/nav/Nav';
import ShopNav from '../../../components/shop/nav/ShopNav';
import Order from '../../../components/shop/checkout/Order';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useFirestore } from '../../../hooks/useFirestore';

// Icon
import check from '../../../assets/icons/icon-check.svg';
import iconX from '../../../assets/icons/icon-x.svg';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Button and checkbox
  tertiary: 'hsl(0, 0%, 90%)',
  input: 'hsl(0, 0%, 70%)', // Input lines
  black: 'hsl(0, 0%, 0%)',
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin: 5rem;
`;

const Main = styled.div`
  display: flex;
  align-items: start;
  max-width: 1400px;
`;

const Left = styled.div`
  min-width: 40vw;
`;

const Category = styled.div`
  margin-bottom: 2.5rem;
`;

const CategoryName = styled.div`
  border-bottom: 1px solid ${colors.tertiary};
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.primary};
  padding-bottom: 0.25rem;
  margin-bottom: 1.25rem;
`;

const Informations = styled.div`
  line-height: 1.125rem;
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: 'Playfair Display', sans-serif;
`;

const Subheading = styled.div`
  border-bottom: 1px solid ${colors.black};
  text-transform: uppercase;
  color: ${colors.black};
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3rem 5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldLarge = styled(Field)`
  grid-column: 1 / -1;
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
  font-family: 'Source Sans Pro', sans-serif;

  &::placeholder {
    color: ${colors.input};
  }

  &:focus {
    border-bottom: 1px solid ${colors.black};
  }
`;

const HiddenInput = styled.input`
  visibility: hidden;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;

  &:before {
    display: inline-block;
    content: '';
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    border-radius: 2px;
    border: 1px solid ${colors.secondary};
    background-color: ${(props) => (props.isChecked ? colors.secondary : '')};
    background-image: ${(props) => (props.isChecked ? `url(${check})` : '')};
    background-position: ${(props) => (props.isChecked ? 'center' : '')};
  }
`;

const Li = styled.li`
  padding-left: 1rem;
  text-indent: 1rem;
  line-height: 1.25rem;
  display: flex;
  align-items: center;
  margin-bottom: .5rem;

  &:before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url(${iconX});
  }
`;

const CardButton = styled.button`
  margin-left: auto;
  color: ${colors.secondary};

  &:hover {
    color: ${colors.black};
  }

`;

const Button = styled.button`
  margin-top: 2.5rem;
  font-family: 'Source Sans Pro', sans-serif;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.tertiary};
  background: ${colors.secondary};
  align-self: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

function Payment({ location }) {
  /* Props :
    - location.state.personal : informations the user entered on the informations page.
  */

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [date, setDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [remember, setRemember] = useState(false);
  const [cards, setCards] = useState([]);

  const history = useHistory();
  const { currentUser } = useAuth();
  const { addCard, getCards, getCart, createOrder, deleteCart } = useFirestore();

  // If the user is logged in, they might have saved cards.
  // We display them so that they can checkout faster.
  useEffect(() => {
    if (currentUser.isAnonymous) return;
    (async () => {
      const cards = await getCards(currentUser.uid);
      setCards(cards);
    })();
  }, [])

  const confirmOrder = async (e) => {
    e.preventDefault();

    const cart = await getCart(currentUser.uid);
    const order = await createOrder(cart, location.state.personal, {
      name,
      number,
      date,
      cvc,
    });
    await deleteCart(currentUser.uid);

    if (remember) {
      addCard(currentUser.uid, name, number, date, cvc);
    }

    history.push({
      pathname: `/shop/confirmation/${order}`,
      state: {
        payment: true,
      },
    });
  };

  return (
    <>
      {location.state ? (
        <Wrapper>
          <header>
            <Nav />
            <ShopNav />
          </header>

          <Container>
            <Main>
              <Left>
                <Heading>Checkout</Heading>

                <Category>
                  <Subheading>Shipping Details</Subheading>
                  <Informations>
                    <div>
                      {location.state.personal.firstName}{' '}
                      {location.state.personal.lastName}
                    </div>
                    <div>{location.state.personal.address}</div>
                    <div>
                      {location.state.personal.zipCode}{' '}
                      {location.state.personal.city}
                    </div>
                    <div>{location.state.personal.country}</div>
                  </Informations>
                </Category>

                <Category>
                  <Subheading>Payment Details</Subheading>
                  {cards.length !== 0 && 
                  <>
                    <CategoryName>Use an existing card</CategoryName>

                    <Category>
                      {cards.map(card => {
                        return (
                          <Li key={card.id}>
                            <div><strong>{card.name}</strong> — {card.number.slice(-4)}</div>
                            <CardButton type="button" onClick={async () => {
                              const cart = await getCart(currentUser.uid);
                              const order = await createOrder(cart, location.state.personal, {
                                name: card.name,
                                number: card.number,
                                date: card.date,
                                cvc: card.cvc,
                              });
                              await deleteCart(currentUser.uid);

                              history.push({
                                pathname: `/shop/confirmation/${order}`,
                                state: {
                                  payment: true,
                                },
                              });
                            }}>Pay with this card →</CardButton>
                          </Li>
                        )
                      })}
                    </Category>

                    <CategoryName>Use another card</CategoryName>
                  </>
                  }

                  <Form onSubmit={confirmOrder}>
                    <Fields>
                      <FieldLarge>
                        <Label htmlFor='name'>Name on card</Label>
                        <Input
                          type='text'
                          value={name}
                          id='name'
                          onChange={(e) => setName(e.target.value)}
                          placeholder='Enter your full name'
                        />
                      </FieldLarge>

                      <FieldLarge>
                        <Label htmlFor='card_number'>Card number</Label>
                        <Input
                          type='text'
                          value={number}
                          id='card_number'
                          onChange={(e) => {
                            let number = e.target.value.replace(/[^0-9]/g, '');
                            setNumber(number);
                          }}
                          placeholder='Enter your card number'
                        />
                      </FieldLarge>

                      <Field>
                        <Label htmlFor='date'>Valid Through</Label>
                        <Input
                          type='text'
                          id='date'
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          placeholder='MM / YY'
                        />
                      </Field>

                      <Field>
                        <Label htmlFor='cvc'>CVC Code</Label>
                        <Input
                          type='text'
                          id='cvc'
                          value={cvc}
                          onChange={(e) => {
                            let cvc = e.target.value.replace(/[^0-9]/g, '');
                            setCvc(cvc);
                          }}
                          placeholder='Enter your CVC code'
                        />
                      </Field>

                      {!currentUser.isAnonymous && (
                        <>
                          <CheckboxLabel
                            htmlFor='remember'
                            isChecked={remember}
                          >
                            Remember my card for easier checkout.
                          </CheckboxLabel>
                          <HiddenInput
                            type='checkbox'
                            id='remember'
                            name='remember'
                            checked={remember}
                            onChange={() => setRemember(!remember)}
                          />
                        </>
                      )}
                    </Fields>

                    <Button type='submit'>Confirm my order</Button>
                  </Form>
                </Category>
              </Left>

              <Order />
            </Main>
          </Container>
        </Wrapper>
      ) : (
        <Redirect to='/shop/cart' />
      )}
    </>
  );
}

export default Payment;
