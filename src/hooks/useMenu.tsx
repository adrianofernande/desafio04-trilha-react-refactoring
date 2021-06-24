import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../services/api";
import { IFood, TFoodAdd } from "../interfaces/IFood";

interface MenuProviderProps {
  children: ReactNode;
}

interface MenuContextData {
  menu: IFood[];
  addFood: (food: TFoodAdd) => Promise<void>;
  updateFood: (food: IFood) => Promise<void>;
  deleteFood: (foodId: number) => Promise<void>;
  selectFood: (selectedFood: IFood) => void;
  toggleAvailable(food: IFood, isAvailable: boolean): Promise<void>;
  available: boolean;
}

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

export function MenuProvider({ children }: MenuProviderProps): JSX.Element {
  const [available, setAvailable] = useState(false);
  const [food, setFood] = useState<IFood | null>(null);
  const [menu, setMenu] = useState<IFood[]>([]);

  const addFood = async (food: TFoodAdd) => {
    try {
      const response = await api.post("/foods", {
        ...food,
        available: true,
      });
      await updateMenu();
    } catch (err) {
      toast.error("Erro na adição do prato");
    }
  };

  const updateFood = async (editingFood: IFood) => {
    try {
      await api.put(`foods/${editingFood.id}`, editingFood);
      await updateMenu();
    } catch (err) {
      toast.error("Erro na alteração do produto");
    }
  };

  const deleteFood = async (foodId: number) => {
    await api.delete(`foods/${foodId}`);
    await updateMenu();
  };

  const selectFood = (selectedFood: IFood) => {
    setFood(selectedFood);
  };

  const updateMenu = async () => {
    const menuUpdated = await api.get("foods");
    setMenu(menuUpdated.data);
  };

  const toggleAvailable = async (food: IFood, isAvailable: boolean) => {
     await api.put(`/foods/${food.id}`, {
      ...food,
      available: isAvailable,
    });

    await updateMenu();
  };

  return (
    <MenuContext.Provider
      value={{
        menu,
        addFood,
        updateFood,
        deleteFood,
        selectFood,
        toggleAvailable,
        available,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu(): MenuContextData {
  const context = useContext(MenuContext);
  return context;
}
