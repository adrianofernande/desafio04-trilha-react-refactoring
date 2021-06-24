import {  useEffect, useState } from "react";

import { Header } from "../../components/Header";
import { Food } from "../../components/Food";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodsContainer } from "./styles";
import api from "../../services/api";
import { useMenu } from "../../hooks/useMenu";
import { IFood } from "../../interfaces/IFood";

export const Dashboard: React.FC = (): JSX.Element => {
  const { menu } = useMenu();
  const [foods, setFoods] = useState(menu);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);

  const handleEditFood = (food: IFood) => {
    setEditingFood(food);
    setEditModalOpen(true);
  };
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("foods");
      setFoods(response.data);
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get("foods");
      setFoods(response.data);
    };
    getData();
  }, [menu]);

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood isOpen={modalOpen} setIsOpen={toggleModal} />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((item) => (
            <Food key={item.id} food={item} handleEditFood={handleEditFood} />
          ))}
      </FoodsContainer>
    </>
  );
};
