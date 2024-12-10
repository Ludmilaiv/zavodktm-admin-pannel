import Form from '../form';

const AuthorPage = ({showActivePage, activePage}) => {
  return (
    <div className="author__page">
      <Form formType="author" activePage={activePage} showActivePage={showActivePage} />
    </div>
  )
}

export default AuthorPage