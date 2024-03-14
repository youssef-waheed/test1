import React, { useState, useEffect } from 'react';
import { Document, Page, Image, Text, View, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';

const PrintCard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('YOUR_API_ENDPOINT_HERE');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="two-column-wrapper">
    <div className="col">
    <input
          type="text"
          placeholder="Search by name or national ID"
         // value={filter}
         // onChange={(e) => setFilter(e.target.value)}
        />
    </div>
    <div className="coll">

    <ul>
            <li>الاسماء المعروضة هي الطلاب الساكنين و لهم صور و لم يتم طباعة بطاقتهم</li>
            <li>اختار الاسماء المراد طباعتها</li>
            <li>راجع شكل البطاقة و اضغط طباعة</li>
            <li>بعد التاكد من طباعة البطاقات اضغط اخفاء</li>
             <li>__________________________________________________</li>
    </ul>

      {data && <PDFViewer data={data} />}
    </div></div>
  );
};

const PDFViewer = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Image src={data.photoUrl} style={styles.image} />
        <Text>{data.name}</Text>
        <Text>{data.email}</Text>
        {/* Add other details as needed */}
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#ffffff'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  image: {
    width: 100,
    height: 100
  }
});

export default PrintCard;
