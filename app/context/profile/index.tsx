import React, { useContext, useReducer } from "react";

const DEFAULT_INITIAL_STATE = {
  status: StatusTypes.IDLE,
  data: null,
  error: null,
};

const profileReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ProfileStateTypes.READ_USER: {
      return {
        ...state,
        save: {
          status: StatusTypes.PENDING,
          data: payload,
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const ProfileStateContext = React.createContext({});
const ProfileDispatchContext = React.createContext({});

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, DEFAULT_INITIAL_STATE);

  return (
    <ProfileStateContext.Provider value={state}>
      <ProfileDispatchContext.Provider value={dispatch}>
        {children}
      </ProfileDispatchContext.Provider>
    </ProfileStateContext.Provider>
  );
};

export const useProfileState = () => useContext(ProfileStateContext);
export const useProfileDispatch = () => useContext(ProfileDispatchContext);

export default ProfileProvider;
