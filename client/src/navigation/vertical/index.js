import { useState, useEffect } from 'react';

const navigation = () => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {

    fetch('http://localhost:3100/getSession', {
      method: 'GET',
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success' && data.user) {
          // Set the user's role in state
          setUserRole(data.user.role);
        }
      })
      .catch((error) => {
        console.error('Error fetching user session:', error);
      });
  }, []);


  const menuItems = [
    {
      title: 'Dashboard',
      path: '/',
    },
    {
      title: 'Profile',
      path: '/profile',
    },
    {
      sectionTitle: 'Actions',
    },

    {
      title: 'Product Tables',
      path: '/productTable',
    },
    {
      title: 'Product Status Tables',
      path: '/statusTables',
    },
    {
      title: 'Category Tables',
      path: '/cateTables',
    },
  ];

  if (userRole === 'Admin') {
    menuItems.splice(2, 0, 
      {
        title: 'Register new user',
        path: '/pages/register',
      },
      {
      title: 'Manager Users',
      path: '/userTable',
    });
  }

  return menuItems;
};

export default navigation;
