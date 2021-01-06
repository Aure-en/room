import React, { useState } from 'react';
import { useFirestore } from '../../contexts/FirestoreContext';
import { useStorage } from '../../contexts/StorageContext';
import styled from 'styled-components';

const Form = styled.form``;
const Label = styled.label``;
const Field = styled.div`
  margin: 2rem 0;
`;
const Input = styled.input``;
const TextArea = styled.textarea``;
const HandleField = styled.button``;
const SubmitBtn = styled.button``;
const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 2rem;
`;

const Image = styled.img`
  max-width: 100%;
`;

function AddShopItem() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [dimensions, setDimensions] = useState({
    depth: 0,
    height: 0,
    width: 0,
  });
  const [materials, setMaterials] = useState([''])
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState(['']);
  const [colors, setColors] = useState([
    {
      description: '',
      type: '',
      value: '#000',
    },
  ]);
  const [additional, setAdditional] = useState([
    {
      type: '',
      information: '',
    }
  ]);
  const [options, setOptions] = useState([{
    type: '',
    options: [{ option: '', price: ''}],
  }])
  const [imagesPreview, setImagesPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const { createItem, addItem } = useFirestore();
  const { uploadItemImage } = useStorage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const item = await createItem();
    const itemId = item.id;

    // Upload images in the storage and get their urls.
    const imagesUrls = [];
    for (let image of images) {
      const imageUrl = await uploadItemImage(itemId, image);
      imagesUrls.push(imageUrl);
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
    const formattedMaterials = [...materials].filter(material => material !== '');
    const formattedCategories = [...categories].filter(category => category !== '');

    const formattedOptions = {};
    for (let option of options) {
      if (option.type !== '' && option.options.option !== '' && option.options.price !== '') {
        formattedOptions[option.type] = [...option.options];
      }
    }

    // Adds the shop item information in the firestore.
    addItem(
      itemId,
      name,
      price,
      dimensions,
      imagesUrls,
      description,
      colors,
      formattedAdditional,
      formattedOptions,
      formattedMaterials,
      formattedCategories,
    )
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
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>Name</Label>
          <Input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>

        <Field>
          <Label>Price</Label>
          <Input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Field>

        <Field>
          <div>Dimensions</div>
          <Label>Depth</Label>
          <Input
            type='number'
            value={dimensions.depth}
            onChange={(e) =>
              setDimensions({ ...dimensions, depth: +e.target.value })
            }
          />

          <Label>Height</Label>
          <Input
            type='number'
            value={dimensions.height}
            onChange={(e) =>
              setDimensions({ ...dimensions, height: +e.target.value })
            }
          />

          <Label>Width</Label>
          <Input
            type='text'
            value={dimensions.width}
            onChange={(e) =>
              setDimensions({ ...dimensions, width: +e.target.value })
            }
          />
        </Field>

        <Field>
          <div>Materials</div>

          {materials.map((material, index) => {
            return (
              <div>
                <Label>{index + 1}</Label>
                <Input
                  type='text'
                  value={material}
                  onChange={(e) =>
                    setMaterials((prev) => {
                      const materials = [...prev];
                      materials[index] = e.target.value;
                      return materials;
                    })
                  }
                />

                <HandleField
                  type='button'
                  onClick={() =>
                    setMaterials((prev) => {
                      const materials = [...prev];
                      materials.splice(index, 1);
                      return materials;
                    })
                  }
                >
                  Remove
                </HandleField>
              </div>
            );
          })}

          <HandleField
            type='button' onClick={() => setMaterials([...materials, ''])}>
            Add
          </HandleField>
        </Field>

        <Field>
          <Label>Description</Label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        <Field>
          <div>Colors</div>

          {colors.map((color, index) => {
            return (
              <div>
                <Label>Description</Label>
                <Input
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

                <Label>Type</Label>
                <Input
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

                <Label>Value</Label>
                <Input
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
                <HandleField
                  type='button'
                  onClick={() =>
                    setColors((prev) => {
                      const colors = [...prev];
                      colors.splice(index, 1);
                      return colors;
                    })
                  }
                >
                  Remove
                </HandleField>
              </div>
            );
          })}

          <HandleField
            type='button'
            onClick={() =>
              setColors([...colors, { description: '', type: '', value: '#000' }])
            }
          >
            Add
          </HandleField>
        </Field>

        <Field>
          <div>Categories</div>

          {categories.map((category, index) => {
            return (
              <div>
                <Label>{index + 1}</Label>
                <Input
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

                <HandleField
                  type='button'
                  onClick={() =>
                    setCategories((prev) => {
                      const categories = [...prev];
                      categories.splice(index, 1);
                      return categories;
                    })
                  }
                >
                  Remove
                </HandleField>
              </div>
            );
          })}

          <HandleField
            type='button' onClick={() => setCategories([...categories, ''])}>
            Add
          </HandleField>
        </Field>

        <Field>
          <div>Options</div>

          {options.map((option, indexOption) => {
            return (
              <div>
                <Label>Type</Label>
                <Input
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

                <Field>
                  <Label>Options</Label>

                  {option.options.map((choice, indexChoice) => {
                    return (
                      <div>
                        <Label>Option</Label>
                        <Input
                          type='text'
                          value={choice.option}
                          onChange={(e) =>
                            setOptions((prev) => {
                              const options = [...prev];
                              options[indexOption].options[indexChoice].option = e.target.value;
                              return options;
                            })
                          }
                        />

                        <Label>Price</Label>
                        <Input
                          type='number'
                          value={choice.price}
                          onChange={(e) =>
                            setOptions((prev) => {
                              const options = [...prev];
                              options[indexOption].options[indexChoice].price = e.target.value;
                              return options;
                            })
                          }
                        />

                      <HandleField
                        type='button'
                        onClick={() => {
                          const newOptions = [...options];
                          newOptions[indexOption].options.splice(indexChoice, 1);
                          setOptions(newOptions)
                        }}
                      >
                        Remove Choice
                      </HandleField>
                      </div>
                    )
                  })}

            <HandleField
              type='button'
              onClick={() => {
                const newOptions = [...options];
                newOptions[indexOption].options = [...options[indexOption].options, { option: '', price : ''}];
                setOptions(newOptions)
              }}
            >
              Add Choice
            </HandleField>
          </Field>

                <HandleField
                  type='button'
                  onClick={() =>
                    setOptions((prev) => {
                      const options = [...prev];
                      options.splice(indexOption, 1);
                      return options;
                    })
                  }
                >
                  Remove Option
                </HandleField>
              </div>
            );
          })}

          <HandleField
            type='button'
            onClick={() =>
              setOptions([...options, { type: '', options: ['']}])
            }
          >
            Add Option
          </HandleField>
        </Field>

        <Field>
          <div>Additional</div>

          {additional.map((add, index) => {
            return (
              <div>
                <Label>Type</Label>
                <Input
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

                <Label>Information</Label>
                <Input
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

                <HandleField
                  type='button'
                  onClick={() =>
                    setAdditional((prev) => {
                      const additional = [...prev];
                      additional.splice(index, 1);
                      return additional;
                    })
                  }
                >
                  Remove
                </HandleField>
              </div>
            );
          })}

          <HandleField
            type='button'
            onClick={() =>
              setAdditional([...additional, { type: '', information: ''}])
            }
          >
            Add
          </HandleField>
        </Field>

        <Field>
          <input
            type='file'
            id='avatar'
            name='avatar'
            multiple
            onChange={addImages}
          />

          <Preview>
          {imagesPreview.map(image => {
            return (
              <Image src={image} alt='preview'/>
            )
          })}
        </Preview>
        </Field>


      <SubmitBtn type="submit">Submit</SubmitBtn>
      </Form>
    </div>
  );
}

export default AddShopItem;
