import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuth } from '../../contexts/AuthContext';
import { useFavorite } from '../../contexts/FavoriteContext';
import { formatNavLink } from '../../utils/utils';
import ImagesPreview from '../../components/shop/items/ImagesPreview';
import { CSSTransition } from 'react-transition-group';

// Icons
import { ReactComponent as AngleRight } from '../../assets/icons/icon-small-arrow.svg';
import { ReactComponent as Plus } from '../../assets/icons/icon-plus.svg';
import { ReactComponent as Minus } from '../../assets/icons/icon-minus.svg';
import { ReactComponent as Heart } from '../../assets/icons/icon-heart.svg';
import { ReactComponent as HeartFilled } from '../../assets/icons/icon-heart-filled.svg';
import iconX from '../../assets/icons/icon-x.svg';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 15%)', // Dark Grey
  tertiary: 'hsl(0, 0%, 70%)', // Bright Grey
  text: 'hsl(0, 0%, 35%)',
  button: 'hsl(0, 0%, 100%)', // White
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const Center = styled.section`
  max-width: 1200px;
`;

// Category Links above the item preview
const Category = styled.div`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.825rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const CategoryLink = styled.span`
  color: ${colors.primary};

  &:hover {
    color: ${colors.secondary};
  }
`;

const ArrowIcon = styled.span`
  display: inline-block;
  margin: 2px 0.5rem 0 0.5rem;
  color: ${colors.primary};
`;

// Informations about the item
const Informations = styled.div`
  display: flex;
`;

const Description = styled.div`
  display: grid;
  grid-gap: 1rem;
  text-align: justify;
  color: ${colors.text};
  line-height: 1.25rem;
`;

const Details = styled.div`
  margin-left: 5rem;

  & > * {
    margin-bottom: 1.5rem;
  }
`;

const Name = styled.h2`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 1.25rem;
`;

const Price = styled.div`
  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${colors.secondary};
`;

// Selection and adding to basket

const Selection = styled.form`
  border-top: 1px solid ${colors.tertiary};
  border-bottom: 1px solid ${colors.tertiary};
  padding: 0.5rem 0;

  & > * {
    margin: 1rem 0;
  }
`;

const Choice = styled.span`
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.text};
`;

const TextLabel = styled.span`
  display: inline-block;
  text-transform: uppercase;
  color: ${colors.secondary};
  font-weight: 600;
`;

const Label = styled.label`
  text-transform: uppercase;
  color: ${colors.secondary};
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Checkbox = styled.input`
  opacity: 0;
  appearance: none;
`;

const SubmitBtn = styled.button`
  font-family: 'Source Sans Pro', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.825rem;
  padding: 0.75rem 1.25rem;
  color: ${colors.button};
  background: ${colors.primary};
  transition: all 0.15s linear;
  cursor: pointer;
  width: 10.5rem;

  &:hover {
    letter-spacing: 1.5px;
  }
`;

// Select the item's color
const ColorList = styled.ul`
  display: flex;
`;

const ColorLabel = styled.label`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => props.value};
  border: 1px solid
    ${(props) => (props.isSelected ? colors.primary : colors.tertiary)};
  cursor: pointer;
  margin-right: 0.5rem;
`;

// Select an option
const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr auto);
`;

const OptionsField = styled.div`
  display: flex;
  align-items: center;
`;

const OptionLabel = styled.label`
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.isSelected ? colors.secondary : colors.text)};
  color: ${(props) => (props.isSelected ? colors.secondary : colors.text)};
  outline: 1px solid
    ${(props) => (props.isSelected ? colors.secondary : 'transparent')};
  padding: 0.5rem 1rem;
  margin-left: 1rem;
`;

// Select a quantity
const Quantity = styled.input`
  font-family: 'Source Sans Pro', sans-serif;
  width: 2rem;
  height: 2rem;
  text-align: center;
  margin-left: 1rem;
`;

// Additional informations dropdown

const Additional = styled.div`
  border-bottom: 1px solid ${colors.tertiary};
`;

const AdditionalBtn = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: 'Source Sans Pro', sans-serif;
  text-transform: uppercase;
  color: ${colors.secondary};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  padding: 0;
  padding-bottom: 1.5rem;
`;

const Li = styled.li`
  padding-left: 1rem;
  text-indent: -1rem;
  line-height: 1.25rem;

  &:before {
    content: '';
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-bottom: -5px;
    background: url(${iconX});
  }
`;

const AdditionalLabel = styled.span`
  font-weight: 600;
  text-transform: capitalize;
`;

const AdditionalInfo = styled.span`
  color: ${colors.text};
`;

const Dropdown = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  margin: 0 1.5rem;
`;

const DropdownColumn = styled.div`
  padding-bottom: 1.5rem;

  & > *:first-child {
    margin-bottom: 0.5rem;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 168px; // Size of button
`;

const Message = styled.div`
  text-align: center;
  font-size: 0.825rem;
  color: ${colors.primary};
  margin-top: 0.25rem;
`;

const Icon = styled.span`
  color: ${colors.primary};
  cursor: pointer;
`;

function ItemDetails({ match }) {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentColor, setCurrentColor] = useState('');
  const [currentOption, setCurrentOption] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [areDetailsOpen, setAreDetailsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { getItem, addToCart } = useFirestore();
  const { currentUser, signInAnonymously } = useAuth();
  const { favorites, addFavorite, deleteFavorite } = useFavorite();

  const handleFavorite = async (id) => {
    let userId = currentUser && currentUser.uid;

    if (!currentUser) {
      const user = await signInAnonymously();
      userId = user.user.uid;
    }
    favorites.includes(id) ? deleteFavorite(userId, id) : addFavorite(userId, id);
  }

  // Fetch the item data and store it in the state
  useEffect(() => {
    (async () => {
      const itemId = match.params.itemId;
      const item = await getItem(itemId);
      setItem(item);
      setLoading(false);
    })();
  }, []);

  // Sets the default color and the default option (if there are any)
  useEffect(() => {
    if (Object.keys(item).length === 0) return;
    setCurrentColor(item.colors[0].description);

    if (Object.keys(item.options).length !== 0) {
      const options = [];
      for (let key of Object.keys(item.options)) {
        options.push({ [key]: item.options[key][0].option });
      }
      setCurrentOption(options);
    }
  }, [item]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setMessage('');

    // If the user is not signed in, we sign him up anonymously to save his cart and allow him to order.

    let userId = currentUser && currentUser.uid;

    if (!currentUser) {
      const user = await signInAnonymously();
      console.log(user);
      userId = user.user.uid;
    }

    try {
      await addToCart(
        userId,
        item.id,
        item.name,
        item.images[0],
        currentColor,
        currentOption,
        quantity,
        item.type,
        item.price
      );
      setMessage(`${item.name} in ${currentColor} was added to your cart.`);
    } catch (e) {
      setMessage(
        'Sorry, there was an error: we were not able to add the item to your cart.'
      );
    }
  };

  return (
    <Container>
      {!loading && (
        <Center>
          <Category>
            <Link to='/'>
              <CategoryLink>Home</CategoryLink>
            </Link>
            <ArrowIcon>
              <AngleRight />
            </ArrowIcon>
            <Link to='/shop'>
              <CategoryLink>Shop</CategoryLink>
            </Link>

            {item.categories.map((category) => {
              return (
                <React.Fragment key={category}>
                  <ArrowIcon>
                    <AngleRight />
                  </ArrowIcon>
                  <Link to={`/shop/${encodeURI(category)}`}>
                    <CategoryLink>{formatNavLink(category)}</CategoryLink>
                  </Link>
                </React.Fragment>
              );
            })}
          </Category>

          <Informations>
            <ImagesPreview images={item.images} size={35} />
            <Details>
              <Row>
                <Name>{item.name}</Name>
                <Icon onClick={() => handleFavorite(item.id)}>
                  {favorites.includes(item.id) ? <HeartFilled /> : <Heart />}
                </Icon>
              </Row>
              <Price>£{item.price}</Price>
              <Description>
                {item.description.map((paragraph, index) => {
                  return <p key={'description' + index}>{paragraph}</p>;
                })}
              </Description>

              <Selection onSubmit={handleAddToCart}>
                <div>
                  <TextLabel>Color: </TextLabel>
                  <Choice> {currentColor}</Choice>
                </div>
                <ColorList>
                  {item.colors.map((color) => {
                    return (
                      <li key={color.description}>
                        <ColorLabel
                          htmlFor={color.description}
                          value={color.value}
                          title={color.description}
                          isSelected={currentColor === color.description}
                        />
                        <Checkbox
                          type='checkbox'
                          id={color.description}
                          name={color.description}
                          onClick={(e) => setCurrentColor(e.target.name)}
                        />
                      </li>
                    );
                  })}
                </ColorList>

                <div>
                  {Object.keys(item.options).map((option, index) => {
                    return (
                      <OptionsField key={option}>
                        <TextLabel>{option}: </TextLabel>
                        <Options>
                          {item.options[option].map((choice) => {
                            return (
                              <>
                                <OptionLabel
                                  htmlFor={choice.option}
                                  isSelected={
                                    currentOption[index][option] ===
                                    choice.option
                                  }
                                >
                                  {choice.option}
                                </OptionLabel>
                                <Checkbox
                                  type='checkbox'
                                  id={choice.option}
                                  name={choice.option}
                                  onClick={() =>
                                    setCurrentOption((prev) => {
                                      return [...prev].map((prevOption) => {
                                        if (
                                          Object.keys(prevOption)[0] ===
                                          option
                                        ) {
                                          return { [option]: choice.option };
                                        } else {
                                          return prevOption;
                                        }
                                      });
                                    })
                                  }
                                />
                              </>
                            );
                          })}
                        </Options>
                      </OptionsField>
                    );
                  })}
                </div>

                <Row>
                  <div>
                    <Label htmlFor='quantity'>Quantity: </Label>
                    <Quantity
                      type='text'
                      id='quantity'
                      name='quantity'
                      value={quantity}
                      required
                      onChange={(e) => {
                        const quantity = e.target.value.replace(
                          /[^0-9]/g,
                          ''
                        );
                        setQuantity(quantity);
                      }}
                      onBlur={(e) => {
                        if (e.target.value < 1) setQuantity(1);
                      }}
                    />
                  </div>
                  <Column>
                    <SubmitBtn type='submit'>Add to Basket</SubmitBtn>
                    <CSSTransition
                      in={message.length !== 0}
                      timeout={300}
                      classNames='fade'
                    >
                      <Message>{message}</Message>
                    </CSSTransition>
                  </Column>
                </Row>
              </Selection>

              <Additional>
                <AdditionalBtn
                  onClick={() => setAreDetailsOpen(!areDetailsOpen)}
                >
                  Additional Information
                  {areDetailsOpen ? <Minus /> : <Plus />}
                </AdditionalBtn>

                <CSSTransition
                  in={areDetailsOpen}
                  timeout={500}
                  classNames='details'
                  mountOnEnter={true}
                >
                  <Dropdown>
                    <DropdownColumn>
                      <TextLabel>Dimensions (cm)</TextLabel>
                      <ul>
                        {Object.keys(item.dimensions).map((dimension) => {
                          return (
                            <Li key={dimension}>
                              <AdditionalLabel>{dimension}:</AdditionalLabel>
                              <AdditionalInfo>
                                {' '}
                                {item.dimensions[dimension]}
                              </AdditionalInfo>
                            </Li>
                          );
                        })}
                      </ul>
                    </DropdownColumn>

                    <DropdownColumn>
                      <TextLabel>Details</TextLabel>
                      <ul>
                        {Object.keys(item.additional).map((info) => {
                          return (
                            <Li key={info}>
                              <AdditionalLabel>{info}:</AdditionalLabel>
                              <AdditionalInfo>
                                {' '}
                                {item.additional[info]}
                              </AdditionalInfo>
                            </Li>
                          );
                        })}
                      </ul>
                    </DropdownColumn>
                  </Dropdown>
                </CSSTransition>
              </Additional>
            </Details>
          </Informations>
        </Center>
      )}
    </Container>
  );
}

export default ItemDetails;
