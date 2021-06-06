import React, {useEffect, useState} from 'react';
import localStorage from 'utils/localStore';

type Props = {
  bookmarks: number[];
  addToBookmarks: (bookmark: number) => void
  removeFromBookmarks: (bookmark: number) => void
};

const INITIAL_VALUE: any = null;

const appContext = React.createContext<Props>(INITIAL_VALUE);

const ContextProvider: React.FC<{}> = ({children}) => {
  const [bookmarks, setBookmarks] = useState<number[]>([]);

  useEffect(() => {
    getLocalBookmarks();
  }, []);

  const getLocalBookmarks = async () => {
    const bookmarks =
      (await localStorage.getItem(localStorage.keys.BOOKMARK)) || [];

    setBookmarks(bookmarks);
  };

  const addToBookmarks = async (bookmark: number) => {
    const newBookmarks = [...bookmarks, bookmark];
    setBookmarks(newBookmarks);
    await localStorage.setItem(localStorage.keys.BOOKMARK, newBookmarks);
  };
  const removeFromBookmarks = async (bookmark: number) => {
    const index = bookmarks.findIndex(val =>  val === bookmark)
    bookmarks.splice(index, 1);
    // const newBookmarks = [...bookmarks, bookmark];
    setBookmarks(bookmarks);
    await localStorage.setItem(localStorage.keys.BOOKMARK, bookmarks);
  };

  return (
    <appContext.Provider
      value={{
        bookmarks,
        addToBookmarks,
        removeFromBookmarks
      }}>
      {children}
    </appContext.Provider>
  );
};

export {appContext};

export default ContextProvider;
