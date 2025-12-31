import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "@/constants/storage";

const defaultTodos: Todo[] = [
    {
        id: 1,
        title: "Buy milk",
        isCompleted: false,
    },
    {
        id: 2,
        title: "Buy bread",
        isCompleted: false,
    },
    {
        id: 3,
        title: "Buy eggs",
        isCompleted: false,
    },
];

const useTodo = () => {
    const [todos, setTodos] = useState<Todo[]>(defaultTodos);
    const [isLoading, setIsLoading] = useState(false);

    const loadTodos = async () => {
        try {
            const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            } else {
                setTodos(defaultTodos);
            }
        } catch (e) {
            setTodos(defaultTodos);
        } finally {
            setIsLoading(false);
        }
    };

    const saveTodos = async () => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } catch (e) {
            console.log(e);
        }
    };

    const onAddTodo = (title: Todo["title"]) => {
        setTodos([...todos, { id: Number(new Date()), title, isCompleted: false }]);
    };

    const onDeleteTodo = (id: Todo["id"]) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const onCheckTodo = (id: Todo["id"]) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        );
    };

    const onUpdateTodoTitle = (id: Todo["id"], title: Todo["title"]) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
    };

    const completedTodos = todos.filter((todo) => todo.isCompleted);

    useEffect(() => {
        loadTodos();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            saveTodos();
        }
    }, [todos]);

    return {
        onAddTodo,
        onDeleteTodo,
        onCheckTodo,
        onUpdateTodoTitle,
        todos,
        completedTodos,
        isLoading,
    };
};

export default useTodo;