import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Result';
import HistoryService from 'src/services/asset';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const HistoryListView = props => {
  const classes = useStyles();
  const [history, setHistory] = useState([]);
  const [historySearch, setHistorySearch] = useState([]);
  const [search, setSearch] = useState('');

  const getHistoryAll = () => {
    HistoryService.getAll()
      .then(response => {
        setHistory(response.data);
        setHistorySearch(response.data);
      })
      .catch(err => console.log(err));
  };

  const getHistory = id => {
    HistoryService.get(id)
      .then(response => {
        setHistory(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onChangeSearch = e => {
    const search = e.target.value;
    setSearch(search);
    HistoryService.getAllByName(search)
      .then(response => {
        setHistory(response.data);
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteHistory = id => {
    HistoryService.remove(id)
      .then(response => {
        getHistoryAll();
        console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteAllHistory = () => {
    HistoryService.removeAll()
      .then(response => {
        getHistoryAll();
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <Results
      histories={history}
      deleteHistory={deleteHistory}
      deleteAllHistory={deleteAllHistory}
    />
  );
};

export default HistoryListView;
