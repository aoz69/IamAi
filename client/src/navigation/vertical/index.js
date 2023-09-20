const navigation = () => {
  return [
    {
      title: 'Dashboard',
      path: '/'
    },
    {
      title: 'Profile',
      path: '/profile'
    },
    {
      title: 'Manager Users',
      path: '/userTable'
    },
    {
      sectionTitle: 'Actions'
    },
    {
      title: 'Register new user',
      path: '/pages/register',
      openInNewTab: true
    },

    {
      title: 'Product Tables',
      path: '/productTable'
    },
    {
      title: 'Product Status Tables',
      path: '/statusTables'
    },    
    {
      title: 'Category Tables',
      path: '/cateTables'
    },
  ]
}

export default navigation
