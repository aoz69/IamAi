const navigation = () => {
  return [
    {
      title: 'Dashboard',
      path: '/'
    },
    {
      title: 'Account Settings',
      path: '/account-settings'
    },
    {
      sectionTitle: 'Actions'
    },
    {
      title: 'Login',
      path: '/pages/login',
      openInNewTab: true
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
    {
      title: 'Form Layouts',
      path: '/form-layouts'
    }
  ]
}

export default navigation
