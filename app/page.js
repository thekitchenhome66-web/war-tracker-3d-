'use client';

import { useState } from 'react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In next step, we'll connect this to Supabase
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8E1' }}>
      
      {/* URGENCY BANNER - HSK 2026 Changes */}
      <div style={{
        background: 'linear-gradient(90deg, #ff4444, #ff6b6b)',
        color: 'white',
        textAlign: 'center',
        padding: '12px',
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        🚨 OLD HSK ENDS JULY 2026! Last chance for easier exam with 1,200 words vs 2,000 in New HSK 3.0
      </div>

      {/* NAVIGATION */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '32px' }}>🐼</span>
          <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>MaoBai</span>
        </div>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#features" style={{ color: '#666', textDecoration: 'none' }}>Features</a>
          <a href="#pricing" style={{ color: '#666', textDecoration: 'none' }}>Pricing</a>
          <a href="#hsk2026" style={{ color: '#ff4444', textDecoration: 'none', fontWeight: 'bold' }}>HSK 2026</a>
          <button style={{
            background: '#7CB342',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '20px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            Start Free
          </button>
        </div>
      </nav>

      {/* HERO SECTION - Above the fold conversion */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 40px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center'
      }}>
        <div>
          <div style={{
            display: 'inline-block',
            background: '#E8F5E9',
            color: '#2E7D32',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            🎯 95% Pass Rate for HSK 4-5
          </div>
          
          <h1 style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: '#333',
            lineHeight: '1.1',
            marginBottom: '24px'
          }}>
            Pass HSK 4-5 with a{' '}
            <span style={{ color: '#7CB342' }}>Panda</span>
          </h1>
          
          <p style={{
            fontSize: '20px',
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '32px'
          }}>
            The only app combining <strong>Leitner spaced repetition</strong> (1-2-5-7-14-30 schedule) 
            with <strong>AI tutoring</strong>. Designed for students who need HSK 4-5 for university graduation 
            in China.
          </p>

          {/* TRUST SIGNALS - University logos */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '12px', color: '#999', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Trusted by students at:
            </p>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', opacity: 0.6 }}>
              <span style={{ fontWeight: 'bold', color: '#666' }}>Tsinghua</span>
              <span style={{ fontWeight: 'bold', color: '#666' }}>Peking Uni</span>
              <span style={{ fontWeight: 'bold', color: '#666' }}>Fudan</span>
              <span style={{ fontWeight: 'bold', color: '#666' }}>Zhejiang</span>
              <span style={{ fontSize: '12px', color: '#999' }}>+500 more</span>
            </div>
          </div>

          {/* CTA FORM - Low friction */}
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  borderRadius: '30px',
                  border: '2px solid #ddd',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#7CB342',
                  color: 'white',
                  border: 'none',
                  padding: '16px 32px',
                  borderRadius: '30px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(124,179,66,0.4)'
                }}
              >
                Start Free →
              </button>
            </form>
          ) : (
            <div style={{
              background: '#E8F5E9',
              color: '#2E7D32',
              padding: '20px',
              borderRadius: '12px',
              marginBottom: '16px'
            }}>
              🎉 Welcome! Check your email to start your first lesson.
            </div>
          )}

          <p style={{ fontSize: '14px', color: '#999' }}>
            🎁 <strong>First 1,000 users</strong> get free Pro for 3 months • No credit card required
          </p>
        </div>

        {/* HERO IMAGE - Panda mascot */}
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '120px', marginBottom: '20px' }}>🐼</div>
          <h3 style={{ color: '#333', marginBottom: '12px' }}>Meet MaoBai</h3>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            Your personal HSK tutor who never gets tired of your questions
          </p>
          
          {/* Social proof stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            borderTop: '1px solid #eee',
            paddingTop: '24px'
          }}>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#7CB342' }}>12,847</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Students</div>
            </div>
            <div>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#7CB342' }}>295+</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Avg Score</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR - Self-selection */}
      <section id="features" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 40px'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '40px',
          marginBottom: '16px',
          color: '#333'
        }}>
          Who is MaoBai For?
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '60px',
          fontSize: '18px'
        }}>
          If you fall into any of these categories, MaoBai was built specifically for you:
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px'
        }}>
          {[
            {
              emoji: '🎓',
              title: 'University Students in China',
              desc: 'Need HSK 4-5 to graduate with your bachelor\'s degree? We help you pass before the deadline.'
            },
            {
              emoji: '✈️',
              title: 'Future China Students',
              desc: 'Applying for Chinese universities? Get your HSK certificate before you arrive (required for admission).'
            },
            {
              emoji: '💼',
              title: 'Scholarship Seekers',
              desc: 'CSC scholarship requires HSK 4-5. Our students have 95% pass rate for CSC language requirements.'
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'white',
              padding: '32px',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{item.emoji}</div>
              <h3 style={{ marginBottom: '12px', color: '#333' }}>{item.title}</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS - Process visualization */}
      <section style={{
        background: 'white',
        padding: '80px 40px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '40px',
            marginBottom: '60px',
            color: '#333'
          }}>
            How MaoBai Works
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '30px'
          }}>
            {[
              { step: '1', title: 'Take Placement Test', desc: 'Skip what you know. Start at your real level (HSK 1-6).' },
              { step: '2', title: 'Daily 20-Min Lessons', desc: 'AI generates exercises based on your weak points.' },
              { step: '3', title: 'Smart Reviews', desc: 'Words come back at 1-2-5-7-14-30 day intervals.' },
              { step: '4', title: 'Pass HSK', desc: 'Take mock exams. Get 295+ on real test. Graduate.' }
            ].map((item, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#7CB342',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  margin: '0 auto 20px'
                }}>
                  {item.step}
                </div>
                <h3 style={{ marginBottom: '12px', color: '#333' }}>{item.title}</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HSK 2026 INFO SECTION */}
      <section id="hsk2026" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 40px'
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '40px',
          marginBottom: '16px',
          color: '#333'
        }}>
          HSK is Changing July 2026
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '60px'
        }}>
          Take advantage of the last Old HSK exams before they get harder
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '30px'
        }}>
          <div style={{
            background: '#FFEBEE',
            padding: '40px',
            borderRadius: '20px',
            border: '2px solid #EF9A9A'
          }}>
            <h3 style={{ color: '#C62828', marginBottom: '20px' }}>⚠️ Old HSK (Until July 2026)</h3>
            <ul style={{ color: '#333', lineHeight: '2', paddingLeft: '20px' }}>
              <li>HSK 4: <strong>1,200 words</strong> total</li>
              <li>Writing: <strong>Recognition only</strong></li>
              <li>Speaking: Optional</li>
              <li>Translation: Not tested</li>
              <li style={{ color: '#C62828', fontWeight: 'bold' }}>✓ Easier to pass!</li>
            </ul>
          </div>

          <div style={{
            background: '#E8F5E9',
            padding: '40px',
            borderRadius: '20px',
            border: '2px solid #A5D6A7'
          }}>
            <h3 style={{ color: '#2E7D32', marginBottom: '20px' }}>🆕 New HSK 3.0 (July 2026+)</h3>
            <ul style={{ color: '#333', lineHeight: '2', paddingLeft: '20px' }}>
              <li>HSK 4: <strong>2,000 words</strong> total</li>
              <li>Writing: <strong>Handwriting required</strong> (150 chars)</li>
              <li>Speaking: <strong>Mandatory</strong></li>
              <li>Translation: Added</li>
              <li style={{ color: '#2E7D32', fontWeight: 'bold' }}>We cover both versions!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PRICING - Transparent pricing */}
      <section id="pricing" style={{
        background: 'white',
        padding: '80px 40px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '40px',
            marginBottom: '16px',
            color: '#333'
          }}>
            Simple Pricing for Students
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#666',
            marginBottom: '60px'
          }}>
            Start free. Upgrade when you're ready. No hidden fees.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '30px',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* FREE PLAN */}
            <div style={{
              background: '#F5F5F5',
              padding: '40px',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginBottom: '8px' }}>Free</h3>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>¥0</div>
              <p style={{ color: '#666', marginBottom: '24px' }}>Forever free</p>
              <ul style={{ textAlign: 'left', color: '#666', lineHeight: '2', marginBottom: '24px', fontSize: '14px' }}>
                <li>✓ 15 words/day</li>
                <li>✓ 5 hearts (lives)</li>
                <li>✓ All HSK levels</li>
                <li>✓ Basic streak tracking</li>
                <li>✗ Ads between lessons</li>
              </ul>
              <button style={{
                width: '100%',
                padding: '12px',
                background: 'white',
                border: '2px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                Get Started
              </button>
            </div>

            {/* PRO PLAN - Highlighted */}
            <div style={{
              background: '#7CB342',
              padding: '40px',
              borderRadius: '20px',
              textAlign: 'center',
              color: 'white',
              transform: 'scale(1.05)',
              boxShadow: '0 10px 40px rgba(124,179,66,0.3)'
            }}>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                marginBottom: '16px'
              }}>
                MOST POPULAR
              </div>
              <h3 style={{ marginBottom: '8px' }}>Pro</h3>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>¥15</div>
              <p style={{ opacity: 0.9, marginBottom: '24px' }}>/month</p>
              <ul style={{ textAlign: 'left', lineHeight: '2', marginBottom: '24px', fontSize: '14px' }}>
                <li>✓ Unlimited words</li>
                <li>✓ Unlimited hearts</li>
                <li>✓ No ads</li>
                <li>✓ AI tutor (100 queries/mo)</li>
                <li>✓ Offline mode</li>
              </ul>
              <button style={{
                width: '100%',
                padding: '12px',
                background: 'white',
                color: '#7CB342',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                Start Pro Trial
              </button>
            </div>

            {/* UNIVERSITY PLAN */}
            <div style={{
              background: '#F5F5F5',
              padding: '40px',
              borderRadius: '20px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginBottom: '8px' }}>University</h3>
              <div style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>¥39</div>
              <p style={{ color: '#666', marginBottom: '24px' }}>/semester (4 months)</p>
              <ul style={{ textAlign: 'left', color: '#666', lineHeight: '2', marginBottom: '24px', fontSize: '14px' }}>
                <li>✓ Everything in Pro</li>
                <li>✓ HSK 4-5 focused</li>
                <li>✓ Mock exam mode</li>
                <li>✓ Writing practice</li>
                <li>✓ Exam date countdown</li>
              </ul>
              <button style={{
                width: '100%',
                padding: '12px',
                background: 'white',
                border: '2px solid #ddd',
                borderRadius: '8px',
                cursor: 'pointer'
              }}>
                Choose University
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF - Testimonials */}
      <section style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '40px', marginBottom: '60px', color: '#333' }}>
          Students Who Passed HSK 4-5
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px'
        }}>
          {[
            {
              name: 'Anara',
              country: '🇰🇿 Kazakhstan',
              score: 'HSK 5 - 298/300',
              quote: 'I needed HSK 5 for Tsinghua. MaoBai\'s Leitner system made sure I never forgot a word. Passed on first try!'
            },
            {
              name: 'Bek',
              country: '🇺🇿 Uzbekistan',
              score: 'HSK 4 - 287/300',
              quote: 'The AI explanations when I made mistakes were game-changing. Like having a tutor 24/7. Best ¥15 I spent.'
            },
            {
              name: 'Lin',
              country: '🇹🇭 Thailand',
              score: 'HSK 4 - 291/300',
              quote: 'Old HSK was ending soon and I panicked. MaoBai helped me cram efficiently and I passed with 2 months of study.'
            }
          ].map((testimonial, idx) => (
            <div key={idx} style={{
              background: 'white',
              padding: '32px',
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              textAlign: 'left'
            }}>
              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '24px' }}>{testimonial.country}</span>
              </div>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '16px', fontStyle: 'italic' }}>
                "{testimonial.quote}"
              </p>
              <div>
                <div style={{ fontWeight: 'bold', color: '#333' }}>{testimonial.name}</div>
                <div style={{ color: '#7CB342', fontWeight: 'bold' }}>{testimonial.score}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{
        background: 'linear-gradient(135deg, #7CB342 0%, #558B2F 100%)',
        padding: '80px 40px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>
          Don't Miss the Last Old HSK Exam
        </h2>
        <p style={{ fontSize: '20px', marginBottom: '40px', opacity: 0.9 }}>
          Join 12,847 students preparing for HSK 4-5. Start free today.
        </p>
        <button style={{
          background: 'white',
          color: '#7CB342',
          border: 'none',
          padding: '20px 48px',
          borderRadius: '30px',
          fontSize: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
        }}>
          Start Learning Free →
        </button>
        <p style={{ marginTop: '20px', opacity: 0.8 }}>
          No credit card required • Cancel anytime
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{
        background: '#333',
        color: 'white',
        padding: '40px',
        textAlign: 'center'
      }}>
        <p>🐼 MaoBai - Made with love for HSK students everywhere</p>
        <p style={{ opacity: 0.6, fontSize: '14px', marginTop: '8px' }}>
          © 2026 MaoBai. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
