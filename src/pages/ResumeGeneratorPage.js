import React, { useState } from 'react';
import { Document, Page, Text, View, StyleSheet as PDFStyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// PDF styles (specific to React-PDF)
const pdfStyles = PDFStyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const ResumeGeneratorPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    linkedin: '',
    portfolio: '',
    summary: '',
    skills: '',
    workExperience: '',
    education: '',
    certifications: '',
    projects: '',
    awards: '',
    volunteerExperience: '',
    languages: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Component to generate PDF content
  const ResumeDocument = () => (
    <Document>
      <Page style={pdfStyles.page}>
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.header}>{formData.fullName}</Text>
          <Text style={pdfStyles.text}>{formData.phoneNumber} | {formData.email}</Text>
          {formData.linkedin && <Text style={pdfStyles.text}>LinkedIn: {formData.linkedin}</Text>}
          {formData.portfolio && <Text style={pdfStyles.text}>Portfolio: {formData.portfolio}</Text>}
        </View>

        {formData.summary && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.subheader}>Summary</Text>
            <Text style={pdfStyles.text}>{formData.summary}</Text>
          </View>
        )}

        {formData.skills && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.subheader}>Skills</Text>
            <Text style={pdfStyles.text}>{formData.skills}</Text>
          </View>
        )}

        {formData.workExperience && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.subheader}>Work Experience</Text>
            <Text style={pdfStyles.text}>{formData.workExperience}</Text>
          </View>
        )}

        {formData.education && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.subheader}>Education</Text>
            <Text style={pdfStyles.text}>{formData.education}</Text>
          </View>
        )}

        {formData.certifications && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.subheader}>Certifications</Text>
            <Text style={pdfStyles.text}>{formData.certifications}</Text>
          </View>
        )}

        {formData.projects && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.subheader}>Projects</Text>
            <Text style={pdfStyles.text}>{formData.projects}</Text>
          </View>
        )}

        {formData.awards && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.subheader}>Awards</Text>
            <Text style={pdfStyles.text}>{formData.awards}</Text>
          </View>
        )}

        {formData.volunteerExperience && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.subheader}>Volunteer Experience</Text>
            <Text style={pdfStyles.text}>{formData.volunteerExperience}</Text>
          </View>
        )}

        {formData.languages && (
          <View style={pdfStyles.section}>
            <Text style={pdfStyles.subheader}>Languages</Text>
            <Text style={pdfStyles.text}>{formData.languages}</Text>
          </View>
        )}

        <View style={pdfStyles.section}>
          <Text style={pdfStyles.subheader}>References</Text>
          <Text style={pdfStyles.text}>Available upon request</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h2 style={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>
        Generate Your Resume
      </h2>

      <form>
        {[
          { name: 'fullName', label: 'Full Name', type: 'text' },
          { name: 'phoneNumber', label: 'Phone Number', type: 'text' },
          { name: 'email', label: 'Email Address', type: 'email' },
          { name: 'linkedin', label: 'LinkedIn (optional)', type: 'text' },
          { name: 'portfolio', label: 'Portfolio/Website (optional)', type: 'text' },
        ].map(({ name, label, type }) => (
          <div key={name} style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>{label}:</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '5px',
              }}
            />
          </div>
        ))}

        {[
          { name: 'summary', label: 'Summary/Objective' },
          { name: 'skills', label: 'Skills' },
          { name: 'workExperience', label: 'Work Experience' },
          { name: 'education', label: 'Education' },
          { name: 'certifications', label: 'Certifications' },
          { name: 'projects', label: 'Projects' },
          { name: 'awards', label: 'Awards' },
          { name: 'volunteerExperience', label: 'Volunteer Experience' },
          { name: 'languages', label: 'Languages' },
        ].map(({ name, label }) => (
          <div key={name} style={{ marginBottom: '20px' }}>
            <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>{label}:</label>
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                height: '100px',
              }}
            />
          </div>
        ))}
      </form>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <PDFDownloadLink
          document={<ResumeDocument />}
          fileName="resume.pdf"
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            padding: '10px 20px',
            fontSize: '14px',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download Resume')}
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default ResumeGeneratorPage;
