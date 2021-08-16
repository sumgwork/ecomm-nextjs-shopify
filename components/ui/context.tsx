import { createContext, FC, useContext, useReducer, useState } from "react";

export interface StateModifiers {
  openSidebar: () => void;
  closeSidebar: () => void;
}

export interface StateValues {
  isSidebarOpen: boolean;
}

type State = StateModifiers & StateValues;

const stateModifiers: StateModifiers = {
  openSidebar: () => {},
  closeSidebar: () => {},
};

const initialState: StateValues = {
  isSidebarOpen: false,
};

const UIContext = createContext<State>({
  ...stateModifiers,
  ...initialState,
});

enum SidebarAction {
  OpenSidebar,
  CloseSidebar,
}

type Action = { type: SidebarAction.OpenSidebar | SidebarAction.CloseSidebar };

function uiReducer(state: StateValues, action: Action) {
  switch (action.type) {
    case SidebarAction.OpenSidebar: {
      return {
        ...state,
        isSidebarOpen: true,
      };
    }
    case SidebarAction.CloseSidebar: {
      return {
        ...state,
        isSidebarOpen: false,
      };
    }
  }
}

export const UIProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openSidebar = () => dispatch({ type: SidebarAction.OpenSidebar });
  const closeSidebar = () => dispatch({ type: SidebarAction.CloseSidebar });

  const value = {
    ...state,
    openSidebar,
    closeSidebar,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = useContext(UIContext);
  return context;
};
