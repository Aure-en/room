import React, { useState, useEffect } from 'react';
import { useFirestore } from '../../contexts/FirestoreContext';
import { useStorage } from '../../contexts/FirestoreStorage';
import styled from 'styled-components';

const Form = styled.form``;
const Label = styled.label``;
const Field = styled.div``;
const Input = styled.input``;
const TextArea = styled.textarea``;
const Select = styled.select``;
const HandleField = styled.button``;
const SubmitBtn = styled.button``;

function AddShopItem() {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [dimensions, setDimensions] = useState({
    depth: 0,
    height: 0,
    width: 0,
  });
  const [images, setImages] = useState([]);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [categories, setCategories] = useState(['']);
  const [colors, setColors] = useState([
    {
      description: '',
      type: '',
      value: '',
    },
  ]);
  const [additional, setAdditional] = useState({});
  const [loading, setLoading] = useState(false);

  const { createItem, addItem } = useFirestore();
  const { uploadItemImage } = useStorage();

  // Additional informations input fields are added / removed depending on the type of item.
  useEffect(() => {
    switch(type) {
      case 'sofa':
        setAdditional(
          {
            seats: 1
          }
        )
        break;
      default:
        setAdditional({});
    }
  }, [type])

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

    // Adds the shop item information in the firestore.
    addItem(
      itemId,
      name,
      price,
      dimensions,
      imagesUrls,
      description,
      colors,
      details,
      additional,
      categories,
      type
    )
  };

  const addImages = (e) => {
    e.preventDefault();
    if (e.target.files.length === 0) return;
    setImages(e.target.files);
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
          />
        </Field>

        <Field>
          <Label>Price</Label>
          <Input
            type='number'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Field>

        <Field>
          <div>Dimensions</div>
          <Label>Depth</Label>
          <Input
            type='number'
            value={dimensions.depth}
            onChange={(e) =>
              setDimensions({ ...dimensions, depth: e.target.value })
            }
          />

          <Label>Height</Label>
          <Input
            type='number'
            value={dimensions.height}
            onChange={(e) =>
              setDimensions({ ...dimensions, height: e.target.value })
            }
          />

          <Label>Width</Label>
          <Input
            type='text'
            value={dimensions.width}
            onChange={(e) =>
              setDimensions({ ...dimensions, width: e.target.value })
            }
          />
        </Field>

        <Field>
          <Label>Type</Label>
          <Select
            onChange={(e) => setType(e.target.value)}
          >
            <option value='sofa'>Sofa</option>
            <option value='table'>Table</option>
            <option value='bed'>Bed</option>
          </Select>
        </Field>

        <Field>
          <Label>Description</Label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>

        <Field>
          <Label>Details</Label>
          <TextArea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
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
              setColors([...colors, { description: '', type: '', value: '' }])
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

        { additional.length !== 0 &&
        <Field>
          <div>Additional Informations</div>

          {Object.keys(additional).map((information, index) => {
            return (
              <div>

                <Label>{information}</Label>
                <Input
                  type='text'
                  value={additional[information]}
                  onChange={(e) =>
                    setAdditional({...additional, [information] : e.target.value})
                  }
                />
                
              </div>
            );
          })}
        </Field>
        }

        <input
          type='file'
          id='avatar'
          name='avatar'
          accept='image/png, image/jpeg, image/jpg'
          multiple
          onChange={addImages}
        />

      <SubmitBtn type="submit">Submit</SubmitBtn>
      </Form>
    </div>
  );
}

export default AddShopItem;
