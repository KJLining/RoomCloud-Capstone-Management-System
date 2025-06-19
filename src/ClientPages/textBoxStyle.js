export const textBoxStyle = {
  entryarea: {
    
    position: 'relative',
    height: 'auto',       // ✅ allow dynamic height
    minHeight: '40px',    // or keep a min height
    lineHeight: '40px',
  },
  labelline: {
    position: 'absolute',
    fontSize: '1em',
    color: '#888888',
    padding: '0 25px',
    margin: '0 25px',
    backgroundColor: 'white',
    transition: '0.2s ease',
    pointerEvents: 'none',
  },
  input: {
    position: 'absolute',
    width: '100%',
    outline: 'none',
    fontSize: '1em',
    padding: '0 30px',
    lineHeight: '200px',
    borderRadius: '10px',
    border: '2px solid black',
    background: 'transparent',
    transition: '0.1s ease',
    zIndex: 1,
  },
  inputFocusOrValid: {
    color: 'black',
    border: '2px solid black',
  },
  labelActive: {
    color: 'black',
    height: '30px',
    lineHeight: '30px',
    padding: '0 12px',
    transform: 'translate(-15px, -16px) scale(0.88)',
    zIndex: 1111,
    backgroundColor: 'white',
  },
};