import styles from './styles.module.css';

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--12" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 1rem'}}>
            <video
              controls
              autoPlay
              muted
              loop
              style={{
                width: '90%',
                maxWidth: '1200px',
                height: 'auto',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)'
              }}
            >
              <source src="/img/full_introduction.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
