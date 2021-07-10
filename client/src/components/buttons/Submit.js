import { motion } from 'framer-motion'
import { Spinner } from 'react-bootstrap'

function Submit(props) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, boxShadow: '#fff' }}
      type="button"
      className={
        props.disabled || props.load ? 'btn btn-dark disabled' : 'btn btn-dark'
      }
      style={{
        ...props.style,
        borderRadius: 20,
        backgroundColor: '#060707',
        color: '#fff',
        fontWeight: 'bolder',
      }}
      onClick={(e) => props.action(e)}
    >
      {props.load && (
        <Spinner
          animation="border"
          variant="light"
          style={{ marginRight: 7, width: 15, height: 15 }}
        />
      )}{' '}
      {props.title}
    </motion.button>
  )
}

export default Submit
