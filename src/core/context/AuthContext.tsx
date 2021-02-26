import { createContext, FC, useCallback, useReducer } from "react";
import { User } from "../../api/auth/AuthDto";

interface AuthState {
  dispatch: (action: Actions) => void;
  user: User | null;
}

const initialState: AuthState = {
  dispatch: (action: Actions) => {},
  user: null
};

export type Actions = {
  type: "SET_USER";
  user: User | null;
};

const reducer = (state: AuthState, action: Actions) => {
  switch (action.type) {
    case "SET_USER": {
      return { ...state, user: action.user };
    }
    default: {
      throw new Error("Unknown auth action");
    }
  }
};

export const AuthContext = createContext<AuthState>(initialState);

export const AuthContextProvider: FC = ({ children }) => {
  const [state, dispatchAction] = useReducer(reducer, initialState);

  const dispatch = useCallback((action: Actions) => {
    if (process.env.NODE_ENV === "development") {
      console.log("Dispatch Action", {
        ...action
      });
    }

    dispatchAction(action);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
