const Activity = ({ fullname, resetLink }) => {
  return (
    <section style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f1f1f1', padding: '30px' }}>
      <div style={{ maxWidth: '600px', margin: 'auto', background: 'white', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
        {/* Logo (replace src with your logo if needed) */}
        <img src="https://yourdomain.com/static/logo.png" alt="Logo" style={{ height: '40px', marginBottom: '20px' }} />

        {/* Icon (you can use an inline SVG or a hosted image) */}
        {/* <img src="https://cdn-icons-png.flaticon.com/512/747/747376.png" alt="Reset Icon" style={{ width: '60px', marginBottom: '25px' }} /> */}
        <img src="https://images.app.goo.gl/sSfHF9zLSBK2EEby8" alt="Reset Icon" style={{ width: '60px', marginBottom: '25px' }} />

        <h2 style={{ color: '#333', marginBottom: '20px' }}>Your new password awaits</h2>

        <p style={{ color: '#555', fontSize: '16px', marginBottom: '20px' }}>
          You recently requested to reset your password. Please click the button below to start the password reset.
        </p>

        <a href={resetLink} style={{ display: 'inline-block', backgroundColor: '#1D8348', color: 'white', padding: '6px 24px',
          textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold'}}>Create Password</a>

        <p style={{ color: '#555', fontSize: '16px', marginTop: '20px', marginBottom: '30px' }}>
          If you did not request a password change, you may ignore this message and your password will remain unchanged.
        </p>

        <p style={{ color: '#186A3B', fontSize: '16px', marginTop: '30px' }}>Markajul Quran Wassunnah Institute</p>
      </div>
    </section>
  )
}

export default Activity;