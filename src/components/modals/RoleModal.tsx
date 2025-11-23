import { useState, useEffect } from "react";
import { RoleTO} from "../../types";
import { COMMON_ROLES, LEVELS } from "../../constants";


interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (role: Omit<RoleTO, "idRole"> | RoleTO) => void; 
  roleToEdit?: RoleTO | null; 
}

const INITIAL_STATE: Omit<RoleTO, "idRole"> = {
  name: "",
  level: "JUNIOR"
};

export default function RoleModal({ isOpen, onClose, onSave, roleToEdit }: RoleModalProps) {
  const [formData, setFormData] = useState<Omit<RoleTO, "idRole"> | RoleTO>(INITIAL_STATE);
  const isEditing = !!roleToEdit;

  useEffect(() => {
    if (isOpen) {
      setFormData(roleToEdit || INITIAL_STATE);
    }
  }, [isOpen, roleToEdit]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
        
        <div className={`px-6 py-4 border-b flex justify-between items-center text-white rounded-t-lg
          ${isEditing ? "bg-indigo-600" : "bg-blue-600"}`}>
          <h3 className="text-xl font-bold">
            {isEditing ? "Editar Cargo" : "Novo Cargo"}
          </h3>
          <button onClick={onClose} className="text-white text-2xl hover:text-gray-200">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
           {/* Seleção de Cargo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cargo (Role)
            </label>
            <select
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              required
            >
              <option value="" disabled>
                Selecione um cargo...
              </option>
              {COMMON_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Seleção de Nível */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nível (Senioridade)</label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
            >
              {LEVELS.map((lvl) => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>

          <div className="text-sm text-gray-500">
            Descrição do Cargo
            <input
              type="text"
              name="description"
              value={"description" in formData ? formData.description || "" : ""}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Descrição opcional do cargo"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-2 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-6 py-2 text-white rounded-md font-medium shadow transition-colors
                ${isEditing ? "bg-indigo-600 hover:bg-indigo-700" : "bg-blue-600 hover:bg-blue-700"}`}
            >
              {isEditing ? "Salvar Alterações" : "Cadastrar Cargo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}