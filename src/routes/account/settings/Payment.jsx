import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useAuth } from "../../../contexts/AuthContext";
import usePayment from "../../../hooks/usePayment";

// Icons
import { ReactComponent as Plus } from "../../../assets/icons/icon-plus.svg";
import { ReactComponent as Minus } from "../../../assets/icons/icon-minus.svg";
import { ReactComponent as Close } from "../../../assets/icons/icon-close.svg";

function Payment() {
  const { currentUser } = useAuth();
  const [cards, setCards] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {
    handleAddCard,
    handleStartEditing,
    handleEditCard,
    deleteCard,
    getCards,
    cardListener,
    name,
    setName,
    number,
    setNumber,
    date,
    setDate,
    cvc,
    setCvc,
    message,
    nameEdit,
    setNameEdit,
    numberEdit,
    setNumberEdit,
    dateEdit,
    setDateEdit,
    cvcEdit,
    setCvcEdit,
    messageEdit,
    isEditing,
    setIsEditing,
  } = usePayment();

  useEffect(() => {
    (async () => {
      const cards = await getCards(currentUser.uid);
      setCards(cards);
      if (cards.length === 0) setIsDropdownOpen(true);
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = cardListener(currentUser.uid, async () => {
      const cards = await getCards(currentUser.uid);
      setCards(cards);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <Heading>Payment</Heading>
      <div>
        <Subheading>Current Cards</Subheading>
        {cards.length === 0 ? (
          <Instructions>
            <div>You do not currently have any saved cards.</div>
            <div>Add one by completing the form below.</div>
          </Instructions>
        ) : (
          <CardsList>
            {cards.map((card) => {
              return (
                <React.Fragment key={card.id}>
                  <Card>
                    <strong>{card.name}</strong>
                    <div>{card.number.slice(-4)}
{' '}
(Last 4 digits)
</div>

                    <Buttons>
                      <ButtonEmpty onClick={() => handleStartEditing(card)}>
                        Edit
                      </ButtonEmpty>
                      <Button
                        onClick={() => deleteCard(currentUser.uid, card.id)}
                      >
                        Delete
                      </Button>
                    </Buttons>
                  </Card>

                  <EditModal
                    isOpen={isEditing}
                    onRequestClose={() => setIsEditing(false)}
                    style={{
                      overlay: {
                        backgroundColor: "rgba(255, 255, 255, .55)",
                      },
                    }}
                  >
                    <EditHeading>Edit your card</EditHeading>
                    <Icon onClick={() => setIsEditing(false)}>
                      <Close />
                    </Icon>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleEditCard(currentUser.uid, card.id);
                      }}
                    >
                      <Fields>
                        <FieldLarge>
                          <Label htmlFor="name_edit">Name on card</Label>
                          <Input
                            type="text"
                            value={nameEdit}
                            id="name_edit"
                            onChange={(e) => setNameEdit(e.target.value)}
                            placeholder="Enter your full name"
                          />
                        </FieldLarge>

                        <FieldLarge>
                          <Label htmlFor="card_number_edit">Card number</Label>
                          <Input
                            type="text"
                            value={numberEdit}
                            id="card_number_edit"
                            onChange={(e) => {
                              const number = e.target.value.replace(
                                /[^0-9]/g,
                                ""
                              );
                              setNumberEdit(number);
                            }}
                            placeholder="Enter your card number"
                          />
                        </FieldLarge>

                        <Field>
                          <Label htmlFor="date_edit">Valid Through</Label>
                          <Input
                            type="text"
                            id="date_edit"
                            value={dateEdit}
                            onChange={(e) => setDateEdit(e.target.value)}
                            placeholder="MM / YY"
                          />
                        </Field>

                        <Field>
                          <Label htmlFor="cvc_edit">CVC Code</Label>
                          <Input
                            type="text"
                            id="cvc_edit"
                            value={cvcEdit}
                            onChange={(e) => {
                              const cvc = e.target.value.replace(/[^0-9]/g, "");
                              setCvcEdit(cvc);
                            }}
                            placeholder="Enter your CVC code"
                          />
                        </Field>
                      </Fields>
                      <Buttons>
                        <ButtonEmpty onClick={() => setIsEditing(false)}>
                          Cancel
                        </ButtonEmpty>
                        <Button type="submit">Edit your card</Button>
                      </Buttons>
                      <Message>{messageEdit}</Message>
                    </Form>
                  </EditModal>
                </React.Fragment>
              );
            })}
          </CardsList>
        )}
      </div>

      <FormHeading onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        Add a new card
        {isDropdownOpen ? <Minus /> : <Plus />}
      </FormHeading>

      {isDropdownOpen && (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCard(currentUser.uid);
          }}
        >
          <Fields>
            <FieldLarge>
              <Label htmlFor="name">Name on card</Label>
              <Input
                type="text"
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </FieldLarge>

            <FieldLarge>
              <Label htmlFor="card_number">Card number</Label>
              <Input
                type="text"
                value={number}
                id="card_number"
                onChange={(e) => {
                  const number = e.target.value.replace(/[^0-9]/g, "");
                  setNumber(number);
                }}
                placeholder="Enter your card number"
              />
            </FieldLarge>

            <Field>
              <Label htmlFor="date">Valid Through</Label>
              <Input
                type="text"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="MM / YY"
              />
            </Field>

            <Field>
              <Label htmlFor="cvc">CVC Code</Label>
              <Input
                type="text"
                id="cvc"
                value={cvc}
                onChange={(e) => {
                  // Makes sure the user can only write 3 numbers.
                  let cvc = e.target.value.replace(/[^0-9]/g, "");
                  if (cvc.length > 3) cvc = cvc.slice(0, 3);
                  setCvc(cvc);
                }}
                placeholder="Enter your CVC code"
              />
            </Field>
          </Fields>

          <Button type="submit">Add a new card</Button>
          <Message>{message}</Message>
        </Form>
      )}
    </div>
  );
}

export default Payment;

// Styled Components
const colors = {
  primary: "hsl(0, 0%, 45%)", // Grey
  secondary: "hsl(0, 0%, 27%)", // Dark Grey
  tertiary: "hsl(0, 0%, 70%)", // Bright Grey
  text: "hsl(0, 0%, 85%)",
  label: "hsl(0, 0%, 100%)",
  quaternary: "hsl(0, 0%, 0%)",
};

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

const FormHeading = styled(Subheading)`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const Instructions = styled.div`
  text-align: center;
  margin: 1rem 0;
  color: ${colors.secondary};
`;

const CardsList = styled.div`
  display: grid;
  margin: 2rem;
  grid-gap: 2rem;

  @media all and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media all and (min-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  padding: 1rem;
  border: 1px solid ${colors.tertiary};
  border-radius: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Fields = styled.div`
  display: grid;
  grid-gap: 3rem 5rem;
  margin-bottom: 2.5rem;

  @media all and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }
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
  font-family: "Source Sans Pro", sans-serif;

  &::placeholder {
    color: ${colors.input};
  }

  &:focus {
    border-bottom: 1px solid ${colors.black};
  }
`;

const Buttons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.text};
  background: ${colors.secondary};
  align-self: center;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    color: ${colors.label};
  }
`;

const ButtonEmpty = styled(Button)`
  background: transparent;
  color: ${colors.secondary};
  border: 1px solid ${colors.secondary};

  &:hover {
    color: ${colors.quaternary};
  }
`;

const EditModal = styled(Modal)`
  position: absolute;
  max-width: 600px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${colors.label};
  padding: 4rem;
  border: 1px solid ${colors.secondary};

  &:focus {
    outline: none;
  }
`;

const EditHeading = styled.h2`
  text-align: center;
  font-family: "Playfair Display", sans-serif;
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const Message = styled.div`
  text-align: center;
  font-size: 0.825rem;
  color: ${colors.primary};
  margin-top: 0.25rem;
`;

const Icon = styled.button`
  position: absolute;
  cursor: pointer;
  top: 1rem;
  right: 1rem;
  color: ${colors.primary};

  &:hover {
    color: ${colors.secondary};
  }
`;
