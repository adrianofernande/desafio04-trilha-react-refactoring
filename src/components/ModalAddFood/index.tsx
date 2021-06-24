import { useRef } from "react";
import { FiCheckSquare } from "react-icons/fi";

import { Form } from "./styles";
import { Modal } from "../Modal";
import { Input } from "../Input";
import { useMenu } from "../../hooks/useMenu";
import { TFoodAdd, IFood } from "../../interfaces/IFood";

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export const ModalAddFood: React.FC<ModalAddFoodProps> = ({
  isOpen,
  setIsOpen,
}): JSX.Element => {
  const { addFood } = useMenu();

  const formRef = useRef();

  const handleSubmit = async (food: TFoodAdd) => {
    const t = await addFood(food);
    setIsOpen();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};
