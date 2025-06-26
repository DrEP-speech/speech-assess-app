import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 12,
    borderBottom: '1px solid #ccc',
    paddingBottom: 8,
  },
  header: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  label: {
    fontWeight: 'bold',
  },
  field: {
    marginBottom: 4,
  }
});

const BatchSessionPDFDocument = ({ sessions }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>📄 Batch Session Summary</Text>

      {sessions.map((s, index) => (
        <View key={s._id || index} style={styles.section}>
          <Text style={styles.label}>👤 Client:</Text>
          <Text style={styles.field}>{s.name}</Text>

          <Text style={styles.label}>📆 Date:</Text>
          <Text style={styles.field}>{s.date} at {s.time}</Text>

          <Text style={styles.label}>🧪 Type:</Text>
          <Text style={styles.field}>{s.type}</Text>

          <Text style={styles.label}>📝 Notes:</Text>
          <Text style={styles.field}>{s.notes || '—'}</Text>

          <Text style={styles.label}>💬 SOAP:</Text>
          <Text style={styles.field}>{s.soap || '—'}</Text>

          <Text style={styles.label}>🏷️ ICD Code:</Text>
          <Text style={styles.field}>{s.icdCode || '—'}</Text>

          <Text style={styles.label}>🏷️ CPT Code:</Text>
          <Text style={styles.field}>{s.cptCode || '—'}</Text>

          <Text style={styles.label}>🧷 Flags:</Text>
          <Text style={styles.field}>{s.flags?.join(', ') || 'None'}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default BatchSessionPDFDocument;
