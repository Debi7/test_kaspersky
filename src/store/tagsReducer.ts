export interface TagsState {
  visibleCount: number;
  showButton: boolean;
  remainingCount: number;
  buttonWidth: number;
}

export type TagsAction =
  | { type: 'SET_VISIBLE_COUNT'; payload: number }
  | { type: 'SET_SHOW_BUTTON'; payload: boolean }
  | { type: 'SET_REMAINING_COUNT'; payload: number }
  | { type: 'SET_BUTTON_WIDTH'; payload: number };

export const initialTagsState: TagsState = {
  visibleCount: 0,
  showButton: false,
  remainingCount: 0,
  buttonWidth: 0,
};

export const tagsReducer = (
  state: TagsState,
  action: TagsAction
): TagsState => {
  switch (action.type) {
    case 'SET_VISIBLE_COUNT':
      return { ...state, visibleCount: action.payload };
    case 'SET_SHOW_BUTTON':
      return { ...state, showButton: action.payload };
    case 'SET_REMAINING_COUNT':
      return { ...state, remainingCount: action.payload };
    case 'SET_BUTTON_WIDTH':
      return { ...state, buttonWidth: action.payload };
    default:
      return state;
  }
};
