import React, { useState } from 'react';
import { useFirestore } from '../../hooks/useFirestore';
import { useStorage } from '../../hooks/useStorage';
import styled from 'styled-components';

// Icons
import { ReactComponent as Plus } from '../../assets/icons/icon-plus.svg';
import { ReactComponent as Close } from '../../assets/icons/icon-x-med.svg';

// Styled Components
const colors = {
  primary: 'hsl(0, 0%, 45%)', // Grey
  secondary: 'hsl(0, 0%, 27%)', // Button and checkbox
  tertiary: 'hsl(0, 0%, 90%)',
  input: 'hsl(0, 0%, 70%)', // Input lines
  black: 'hsl(0, 0%, 0%)',
};

const Container = styled.div`
  margin: 5rem;
  max-width: 1200px;
`;

const Heading = styled.h1`
  margin-bottom: 2rem;
  font-size: 2rem;
  line-height: 2.75rem;
  font-family: 'Playfair Display', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.fields}, 1fr);
  grid-gap: 3rem 5rem;
  margin: 1.25rem 0 3rem 0;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.input};
  border-radius: 15px;
  padding: 1.5rem;

  & > * {
    margin-top: 1rem;
  }

  & > *:first-child {
    margin-top: inherit;
  }
`;

const ChoiceBox = styled(Box)`
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Category = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid ${colors.tertiary};
  text-transform: uppercase;
  color: ${colors.primary};
  padding-bottom: 0.25rem;
  margin-bottom: 1.5rem;
`;

const BoxHeading = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  align-self: center;
  padding: 1rem 0;
`;

const label = `
text-transform: uppercase;
font-size: 0.825rem;
letter-spacing: 1px;
`;

const Label = styled.label`
  ${label}
`;

const TextLabel = styled.div`
  ${label}
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
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

const IconButton = styled.button`
  color: ${colors.primary};

  &:hover {
    color: ${colors.secondary};
  }
`;

const BoxButton = styled(IconButton)`
  align-self: center;
`;

const Button = styled.button`
  font-family: 'Source Sans Pro', sans-serif;
  text-transform: uppercase;
  font-size: 0.9rem;
  color: ${colors.tertiary};
  background: ${colors.secondary};
  align-self: center;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:disabled {
    background: ${colors.input};
    cursor: not-allowed;
  }

`;

const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 2rem;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

const Message = styled.div`
  text-align: center;
  font-size: 0.825rem;
  color: ${colors.primary};
  margin-top: 0.25rem;
`;

function AddShopItem() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [dimensions, setDimensions] = useState({
    depth: 0,
    height: 0,
    width: 0,
  });
  const [materials, setMaterials] = useState(['', '', '']);
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState(['']);
  const [categories, setCategories] = useState(['', '', '']);
  const [colors, setColors] = useState([
    {
      description: '',
      type: '',
      value: '#000000',
      image: '',
    },
  ]);
  const [additional, setAdditional] = useState([
    {
      type: '',
      information: '',
    },
  ]);
  const [options, setOptions] = useState([
    {
      type: '',
      options: [
        {
          option: '',
          price: 0,
          dimensions: {
            width: 0,
            height: 0,
            depth: 0,
          },
        },
      ],
    },
  ]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [seats, setSeats] = useState([]);
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { createItem, addItem } = useFirestore();
  const { uploadItemImage } = useStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    const item = await createItem();
    const itemId = item.id;

    // Upload images in the storage and get their urls.
    const imagesUrls = [];
    for (const image of images) {
      const imageUrl = await uploadItemImage(itemId, image);
      imagesUrls.push(imageUrl);
    }

    const formattedColors = [...colors];
    for (const color of formattedColors) {
      const colorImageUrl = await uploadItemImage(itemId, color.image);
      color.image = colorImageUrl;
    }

    // Format additional informations and options
    // If the fields are empty, they are ignored.
    const formattedAdditional = {};
    for (let information of additional) {
      if (information.type !== '' && information.information !== '') {
        formattedAdditional[information.type] = information.information;
      }
    }

    // Remove empty fields
    const formattedMaterials = [...materials].filter(
      (material) => material !== ''
    );
    const formattedCategories = [...categories].filter(
      (category) => category !== ''
    );

    const formattedOptions = {};
    for (let option of options) {
      if (
        option.type !== '' &&
        option.options.option !== '' &&
        option.options.price !== ''
      ) {
        formattedOptions[option.type] = [...option.options];
      }
    }

    // Create queries (used to search / filter the item)
    const queries = {};

    // Colors filters
    queries.colors = [];
    for (const color of colors) {
      queries.colors.push(color.type);
    }

    // Search terms
    queries.search = [];
    for (const color of colors) {
      queries.search.push(color.type);
    }
    for (const category of formattedCategories) {
      queries.search.push(category);
    }
    for (const material of formattedMaterials) {
      queries.search.concat(...material.split('_'));
    }
    queries.search = queries.search.concat(...name.toLowerCase().split(' '));

    // Material filters
    queries.materials = formattedMaterials;

    // Price filters
    queries.price = {
      min: price,
      max: price,
    };

    for (const option of options) {
      for (const choice of Object.keys(option)) {
        if (choice.price > queries.price.max) {
          queries.price.max = choice.price;
        }
        if (choice.price < queries.price.min) {
          queries.price.min = choice.price;
        }
      }
    }

    // Dimensions filters
    queries.dimensions = {
      width: {
        min: dimensions.width,
        max: dimensions.width,
      },
      height: {
        min: dimensions.height,
        max: dimensions.height,
      },
      depth: {
        min: dimensions.depth,
        max: dimensions.depth,
      },
    };

    for (const option of options) {
      for (const choice of option.options) {
        if (choice.dimensions.width > queries.dimensions.width.max) {
          queries.dimensions.width.max = choice.dimensions.width;
        }
        if (choice.dimensions.width < queries.dimensions.width.min) {
          queries.dimensions.width.min = choice.dimensions.width;
        }
        if (choice.dimensions.height > queries.dimensions.height.max) {
          queries.dimensions.height.max = choice.dimensions.height;
        }
        if (choice.dimensions.height < queries.dimensions.height.min) {
          queries.dimensions.height.min = choice.dimensions.height;
        }
        if (choice.dimensions.depth > queries.dimensions.depth.max) {
          queries.dimensions.depth.max = choice.dimensions.depth;
        }
        if (choice.dimensions.depth < queries.dimensions.depth.min) {
          queries.dimensions.depth.min = choice.dimensions.depth;
        }
      }
    }

    if (seats.length !== 0) {
      queries.seats = seats;
    }

    // Adds the shop item information in the firestore.
    try {
      const id = await addItem(
        itemId,
        name,
        price,
        type,
        dimensions,
        imagesUrls,
        description,
        formattedColors,
        formattedAdditional,
        formattedOptions,
        formattedCategories,
        queries
      );
      setMessage(`The item has been successfully added. Item Id: ${id}.`)
    } catch (e) {
      setMessage('Sorry, we could not add the item.')
    }
    setLoading(false);
  };

  const addImages = (e) => {
    e.preventDefault();
    if (e.target.files.length === 0) return;
    setImages(e.target.files);

    const preview = [];
    for (let file of e.target.files) {
      preview.push(URL.createObjectURL(file));
    }
    setImagesPreview(preview);
  };

  return (
    <Container>
      <Heading>Add an item to the shop</Heading>
      <Form onSubmit={handleSubmit}>
        <Category>General</Category>
        <Fields fields={3}>
          <Field>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the item's name"
              required
            />
          </Field>

          <Field>
            <Label htmlFor='price'>Price</Label>
            <Input
              id='price'
              name='price'
              type='number'
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label htmlFor='type'>Type</Label>
            <Input
              id='type'
              name='type'
              type='text'
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            />
          </Field>
        </Fields>

        <Category>Dimensions</Category>
        <Fields fields={3}>
          <Field>
            <Label htmlFor='depth'>Depth</Label>
            <Input
              id='depth'
              name='depth'
              type='number'
              value={dimensions.depth}
              onChange={(e) =>
                setDimensions({ ...dimensions, depth: +e.target.value })
              }
            />
          </Field>

          <Field>
            <Label htmlFor='height'>Height</Label>
            <Input
              id='height'
              name='height'
              type='number'
              value={dimensions.height}
              onChange={(e) =>
                setDimensions({ ...dimensions, height: +e.target.value })
              }
            />
          </Field>

          <Field>
            <Label htmlFor='width'>Width</Label>
            <Input
              id='width'
              name='width'
              type='text'
              value={dimensions.width}
              onChange={(e) =>
                setDimensions({ ...dimensions, width: +e.target.value })
              }
            />
          </Field>
        </Fields>

        <Field>
          <Category>
            Materials
            <IconButton
              type='button'
              title='Add Material'
              onClick={() => setMaterials([...materials, ''])}
            >
              <Plus />
            </IconButton>
          </Category>
          <Fields fields={3}>
            {materials.map((material, index) => {
              return (
                <Box key={`material_${index + 1}`}>
                  <Field>
                    <Label htmlFor={`material_${index + 1}`}>
                      Material {index + 1}
                    </Label>
                    <Input
                      id={`material_${index + 1}`}
                      name={`material_${index + 1}`}
                      type='text'
                      value={material}
                      placeholder={`Enter Material ${index + 1}`}
                      onChange={(e) =>
                        setMaterials((prev) => {
                          const materials = [...prev];
                          materials[index] = e.target.value;
                          return materials;
                        })
                      }
                    />
                  </Field>
                  <BoxButton
                    type='button'
                    title='Remove Material'
                    onClick={() =>
                      setMaterials((prev) => {
                        const materials = [...prev];
                        materials.splice(index, 1);
                        return materials;
                      })
                    }
                  >
                    <Close />
                  </BoxButton>
                </Box>
              );
            })}
          </Fields>
        </Field>

        <Category>
          Description
          <IconButton
            type='button'
            title='Add Description'
            onClick={() => setDescription([...description, ''])}
          >
            <Plus />
          </IconButton>
        </Category>

        <Fields fields={1}>
          {description.map((description, index) => {
            return (
              <Field key={`description-${index + 1}`}>
                <Label htmlFor={`paragraph_${index + 1}`}>
                  Paragraph {index + 1}
                </Label>
                <Row>
                  <Input
                    id={`paragraph_${index + 1}`}
                    name={`paragraph_${index + 1}`}
                    type='text'
                    value={description}
                    placeholder={`Enter Paragraph ${
                      index + 1
                    } of your description`}
                    onChange={(e) =>
                      setDescription((prev) => {
                        const description = [...prev];
                        description[index] = e.target.value;
                        return description;
                      })
                    }
                  />
                  <IconButton
                    type='button'
                    title='Remove Paragraph'
                    onClick={() =>
                      setDescription((prev) => {
                        const description = [...prev];
                        description.splice(index, 1);
                        return description;
                      })
                    }
                  >
                    <Close />
                  </IconButton>
                </Row>
              </Field>
            );
          })}
        </Fields>

        <Field>
          <Category>
            Colors
            <IconButton
              title='Add a color'
              type='button'
              onClick={() =>
                setColors([
                  ...colors,
                  { description: '', type: '', value: '#000000' },
                ])
              }
            >
              <Plus />
            </IconButton>
          </Category>

          <Fields fields={3}>
            {colors.map((color, index) => {
              return (
                <Box key={`color_${index + 1}`}>
                  <Field>
                    <Label htmlFor={`color_description_${index + 1}`}>
                      Description
                    </Label>
                    <Input
                      id={`color_description_${index + 1}`}
                      name={`color_description_${index + 1}`}
                      type='text'
                      value={color.description}
                      onChange={(e) =>
                        setColors((prev) => {
                          const colors = [...prev];
                          colors[index].description = e.target.value;
                          return colors;
                        })
                      }
                    />
                  </Field>

                  <Field>
                    <Label htmlFor={`color_type_${index + 1}`}>Type</Label>
                    <Input
                      id={`color_type_${index + 1}`}
                      name={`color_type_${index + 1}`}
                      type='text'
                      value={color.type}
                      onChange={(e) =>
                        setColors((prev) => {
                          const colors = [...prev];
                          colors[index].type = e.target.value;
                          return colors;
                        })
                      }
                    />
                  </Field>

                  <Row>
                    <Label htmlFor={`color_type_${index + 1}`}>Value</Label>
                    <input
                      type='color'
                      value={color.value}
                      onChange={(e) =>
                        setColors((prev) => {
                          const colors = [...prev];
                          colors[index].value = e.target.value;
                          return colors;
                        })
                      }
                    />
                  </Row>

                  <input
                    type='file'
                    id='avatar'
                    name='avatar'
                    multiple
                    onChange={(e) => {
                      if (!e.target.files[0]) return;
                      setColors((prev) => {
                        const colors = [...prev];
                        colors[index].image = e.target.files[0];
                        return colors;
                      });
                    }}
                  />

                  <IconButton
                    type='button'
                    title='Remove Color'
                    onClick={() =>
                      setColors((prev) => {
                        const colors = [...prev];
                        colors.splice(index, 1);
                        return colors;
                      })
                    }
                  >
                    <Close />
                  </IconButton>
                </Box>
              );
            })}
          </Fields>
        </Field>

        <Category>
          Categories
          <IconButton
            type='button'
            onClick={() => setCategories([...categories, ''])}
          >
            <Plus />
          </IconButton>
        </Category>

        <Fields fields={3}>
          {categories.map((category, index) => {
            return (
              <Box key={`category-${index + 1}`}>
                <Field>
                  <Label htmlFor={`category_${index + 1}`}>
                    Category {index + 1}
                  </Label>
                  <Input
                    id={`category_${index + 1}`}
                    name={`category_${index + 1}`}
                    type='text'
                    value={category}
                    onChange={(e) =>
                      setCategories((prev) => {
                        const categories = [...prev];
                        categories[index] = e.target.value;
                        return categories;
                      })
                    }
                  />
                </Field>

                <BoxButton
                  type='button'
                  onClick={() =>
                    setCategories((prev) => {
                      const categories = [...prev];
                      categories.splice(index, 1);
                      return categories;
                    })
                  }
                >
                  <Close />
                </BoxButton>
              </Box>
            );
          })}
        </Fields>

        <Field>
          <Category>
            Options
            <IconButton
              type='button'
              title='Add an option'
              onClick={() =>
                setOptions([
                  ...options,
                  {
                    type: '',
                    options: [
                      {
                        option: '',
                        price: 0,
                        dimensions: {
                          width: 0,
                          height: 0,
                          depth: 0,
                        },
                      },
                    ],
                  },
                ])
              }
            >
              <Plus />
            </IconButton>
          </Category>

          {options.map((option, indexOption) => {
            return (
              <div key={`option_${indexOption + 1}`}>
                <Fields fields={1}>
                  <Field>
                    <Label htmlFor={`option_type_${indexOption + 1}`}>
                      Type
                    </Label>
                    <Row>
                      <Input
                        id={`option_type_${indexOption + 1}`}
                        name={`option_type_${indexOption + 1}`}
                        type='text'
                        value={option.type}
                        onChange={(e) =>
                          setOptions((prev) => {
                            const options = [...prev];
                            options[indexOption].type = e.target.value;
                            return options;
                          })
                        }
                      />

                      <IconButton
                        type='button'
                        title='Remove Option'
                        onClick={() =>
                          setOptions((prev) => {
                            const options = [...prev];
                            options.splice(indexOption, 1);
                            return options;
                          })
                        }
                      >
                        <Close />
                      </IconButton>
                    </Row>
                  </Field>
                </Fields>

                <TextLabel>Options</TextLabel>

                <Fields fields={3}>
                  {option.options.map((choice, indexChoice) => {
                    return (
                      <Box
                        key={`option_${indexOption + 1}_choice_${
                          indexChoice + 1
                        }`}
                      >
                        <BoxHeading>General</BoxHeading>
                        <Field>
                          <Label
                            htmlFor={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_option`}
                          >
                            Option
                          </Label>
                          <Input
                            id={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_option`}
                            name={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_option`}
                            type='text'
                            value={choice.option}
                            onChange={(e) =>
                              setOptions((prev) => {
                                const options = [...prev];
                                options[indexOption].options[
                                  indexChoice
                                ].option = e.target.value;
                                return options;
                              })
                            }
                          />
                        </Field>

                        <Field>
                          <Label
                            htmlFor={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_price`}
                          >
                            Price
                          </Label>
                          <Input
                            id={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_price`}
                            name={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_price`}
                            type='number'
                            value={choice.price}
                            onChange={(e) =>
                              setOptions((prev) => {
                                const options = [...prev];
                                options[indexOption].options[
                                  indexChoice
                                ].price = +e.target.value;
                                return options;
                              })
                            }
                          />
                        </Field>

                        <BoxHeading>Dimensions</BoxHeading>
                        <Field>
                          <Label
                            htmlFor={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_depth`}
                          >
                            Depth
                          </Label>
                          <Input
                            id={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_depth`}
                            name={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_depth`}
                            type='number'
                            value={choice.dimensions.depth}
                            onChange={(e) =>
                              setOptions((prev) => {
                                const options = [...prev];
                                options[indexOption].options[
                                  indexChoice
                                ].dimensions.depth = +e.target.value;
                                return options;
                              })
                            }
                          />
                        </Field>

                        <Field>
                          <Label
                            htmlFor={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_height`}
                          >
                            Height
                          </Label>
                          <Input
                            id={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_height`}
                            name={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_height`}
                            type='number'
                            value={choice.dimensions.height}
                            onChange={(e) =>
                              setOptions((prev) => {
                                const options = [...prev];
                                options[indexOption].options[
                                  indexChoice
                                ].dimensions.height = +e.target.value;
                                return options;
                              })
                            }
                          />
                        </Field>

                        <Field>
                          <Label
                            htmlFor={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_width`}
                          >
                            Width
                          </Label>
                          <Input
                            id={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_width`}
                            name={`option_${indexOption + 1}_choice_${
                              indexChoice + 1
                            }_width`}
                            type='number'
                            value={choice.dimensions.width}
                            onChange={(e) =>
                              setOptions((prev) => {
                                const options = [...prev];
                                options[indexOption].options[
                                  indexChoice
                                ].dimensions.width = +e.target.value;
                                return options;
                              })
                            }
                          />
                        </Field>

                        <IconButton
                          title='Remove Choice'
                          type='button'
                          onClick={() => {
                            const newOptions = [...options];
                            newOptions[indexOption].options.splice(
                              indexChoice,
                              1
                            );
                            setOptions(newOptions);
                          }}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    );
                  })}
                  <ChoiceBox
                    onClick={() => {
                      const newOptions = [...options];
                      newOptions[indexOption].options = [
                        ...options[indexOption].options,
                        { option: '', price: 0, dimensions: {
                          width: 0,
                          height: 0,
                          depth: 0,
                        } },
                      ];
                      setOptions(newOptions);
                    }}
                  >
                    <BoxHeading>Add Choice</BoxHeading>
                    <Plus />
                  </ChoiceBox>
                </Fields>
              </div>
            );
          })}
        </Field>

        <Category>
          Additional
          <IconButton
            type='button'
            title='Add an additional information'
            onClick={() =>
              setAdditional([...additional, { type: '', information: '' }])
            }
          >
            <Plus />
          </IconButton>
        </Category>

        <Fields fields={3}>
          {additional.map((add, index) => {
            return (
              <Box key={`additional_${index + 1}`}>
                <Field>
                  <Label htmlFor={`additional_${index + 1}_type`}>Type</Label>
                  <Input
                    id={`additional_${index + 1}_type`}
                    name={`additional_${index + 1}_type`}
                    type='text'
                    value={add.type}
                    onChange={(e) =>
                      setAdditional((prev) => {
                        const additional = [...prev];
                        additional[index].type = e.target.value;
                        return additional;
                      })
                    }
                  />
                </Field>

                <Field>
                  <Label htmlFor={`additional_${index + 1}_information`}>
                    Information
                  </Label>
                  <Row>
                    <Input
                      id={`additional_${index + 1}_information`}
                      name={`additional_${index + 1}_information`}
                      type='text'
                      value={add.information}
                      onChange={(e) =>
                        setAdditional((prev) => {
                          const additional = [...prev];
                          additional[index].information = e.target.value;
                          return additional;
                        })
                      }
                    />
                  </Row>
                </Field>

                <IconButton
                  type='button'
                  onClick={() =>
                    setAdditional((prev) => {
                      const additional = [...prev];
                      additional.splice(index, 1);
                      return additional;
                    })
                  }
                >
                  <Close />
                </IconButton>
              </Box>
            );
          })}
        </Fields>

        <Category>Others</Category>

        <Row>
          <TextLabel>Seats</TextLabel>
          <IconButton
            title='Add Seats Number'
            type='button'
            onClick={() => setSeats([...seats, 1])}
          >
            <Plus />
          </IconButton>
        </Row>

        <Fields fields={3}>
          {seats.map((seat, index) => {
            return (
              <Box key={`seats-${index + 1}`}>
                <Field>
                  <Label htmlFor={`seats_${index + 1}`}>
                    Seats {index + 1}
                  </Label>
                  <Input
                    id={`seats_${index + 1}`}
                    name={`seats_${index + 1}`}
                    type='number'
                    value={seat}
                    onChange={(e) =>
                      setSeats((prev) => {
                        const seats = [...prev];
                        seats[index] = +e.target.value;
                        return seats;
                      })
                    }
                  />
                </Field>

                <BoxButton
                  type='button'
                  onClick={() =>
                    setSeats((prev) => {
                      const seats = [...prev];
                      seats.splice(index, 1);
                      return seats;
                    })
                  }
                >
                  <Close />
                </BoxButton>
              </Box>
            );
          })}
        </Fields>

        <Field>
          <input
            type='file'
            id='avatar'
            name='avatar'
            multiple
            onChange={addImages}
          />

          <Preview>
            {imagesPreview.map((image, index) => {
              return <Image key={`preview_${index}`} src={image} alt='preview' />;
            })}
          </Preview>
        </Field>

        <Button type='submit' disabled={loading}>Add an item</Button>
        <Message>{message}</Message>
      </Form>
    </Container>
  );
}

export default AddShopItem;
