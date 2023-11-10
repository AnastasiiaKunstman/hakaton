/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import {
  Tabs, Tab, Toolbar,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import './NavigationMenu.scss';
import { StyledEngineProvider } from '@mui/material/styles';

interface TabConfig {
  label: string;
  path: string;
}

function NavigationMenu() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (value: string) => {
    setActiveTab(value);
  };

  const tabConfig: TabConfig[] = [
    {
      label: 'Создать вакансию',
      path: '/vacancies',
    },
    {
      label: 'Активные',
      path: '/vacancies/active',
    },
    {
      label: 'Архив',
      path: '/vacancies/archive',
    },
  ];

  const tableTabConfig: TabConfig[] = [
    {
      label: 'Новые',
      path: '/students',
    },
    {
      label: 'Просмотренные',
      path: '/students/viewed ',
    },
    {
      label: 'Приглашенные',
      path: '/students/invited',
    },
    {
      label: 'Избранное',
      path: '/students/save',
    },
  ];

  return (
    <StyledEngineProvider injectFirst>
      <Toolbar className="toolbar">
        <Tabs value={activeTab}>
          {location.pathname.startsWith('/vacancies') ? (
            tabConfig.map((tab) => (
              <Tab
                key={tab.path}
                className="tab"
                style={{
                  color: activeTab !== tab.path ? '#797981' : '#1A1B22',
                }}
                label={tab.label}
                value={tab.path}
                component={Link}
                to={tab.path}
                onClick={() => handleTabClick(tab.path)}
              />
            ))
          ) : location.pathname.startsWith('/students') ? (
            tableTabConfig.map((tab) => (
              <Tab
                key={tab.path}
                className="tab"
                style={{
                  color: activeTab !== tab.path ? '#797981' : '#1A1B22',
                }}
                label={tab.label}
                value={tab.path}
                component={Link}
                to={tab.path}
                onClick={() => handleTabClick(tab.path)}
              />
            ))
          ) : null}
        </Tabs>
      </Toolbar>
    </StyledEngineProvider>
  );
}

export default NavigationMenu;
