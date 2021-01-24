import { firestore } from '../firebase/firebase';

export function useDesign() {

  // Get designed rooms
  const getDesigns = async () => {
    const designsList = [];

    const designs = await firestore.collection('designs').get();
    designs.docs.forEach((design) => designsList.push(design.data()));
    return designsList;
  };

  // Get specific design data
  const getDesign = async (id) => {
    const design = await firestore.collection('designs').doc(id).get();
    return design.data();
  }

  return {
    getDesigns,
    getDesign
  };
}