import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Provider as PaperProvider, Button, TextInput, Card, List, Dialog, Portal, Checkbox, IconButton } from 'react-native-paper';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  quantity: number;
  sizes: string[];
}

interface Transfer {
  _id: string;  
  products: Product[];
  source: string;
  destination: string;
  status: string;
}


const TransferScreen: React.FC = () => {
  const [scanning, setScanning] = useState<boolean>(false);
  const [barcodeData, setBarcodeData] = useState<string>('');
  const [productList, setProductList] = useState<Product[]>([]);
  const [incomingTransfers, setIncomingTransfers] = useState<Transfer[]>([]);
  const [outgoingTransfers, setOutgoingTransfers] = useState<Transfer[]>([]);
  const [acceptedTransfers, setAcceptedTransfers] = useState<Transfer[]>([]);
  const [missingProducts, setMissingProducts] = useState<Product[]>([]);
  const [transferType, setTransferType] = useState<string>('outgoing');
  const [dialogVisible, setDialogVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [checkedProducts, setCheckedProducts] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    fetchIncomingTransfers();
    fetchOutgoingTransfers();
  }, []);

  const fetchIncomingTransfers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/transfers/incoming');
      setIncomingTransfers(response.data);
    } catch (error) {
      console.error('Gelen transferleri alırken hata:', error);
      Alert.alert('Hata', 'Gelen transferleri alırken bir hata oluştu');
    }
  };
  
  const fetchOutgoingTransfers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/transfers/outgoing');
      setOutgoingTransfers(response.data);
    } catch (error) {
      console.error('Giden transferleri alırken hata:', error);
      Alert.alert('Hata', 'Giden transferleri alırken bir hata oluştu');
    }
  };
  

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    console.log(`Barkod ile taranan ürün kodu: ${data}`);
    setScanning(false);
    setBarcodeData(data);
    addProductToList(data);
  };

  const addProductToList = async (code: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/products/search`, { params: { id: code } });
      const product: Product = response.data[0];
      if (product) {
        setProductList(prevList => [...prevList, product]);
        console.log(`Ürün listeye eklendi: ${JSON.stringify(product)}`);
      } else {
        Alert.alert('Hata', 'Ürün bulunamadı');
        console.log('Ürün bulunamadı');
      }
    } catch (error) {
      console.error('Ürün ararken hata:', error);
      Alert.alert('Hata', 'Ürün ararken bir hata oluştu');
    }
  };

  const handleScanPress = () => {
    setScanning(true);
  };

  const handleSendTransfer = async () => {
    if (productList.length > 0) {
      try {
        const response = await axios.post('http://localhost:8000/api/transfers/send', { products: productList });
        const newTransfer: Transfer = response.data;
        setOutgoingTransfers(prevTransfers => [...prevTransfers, newTransfer]);
        setProductList([]);
        Alert.alert('Başarılı', 'Transfer Gönderildi');
        console.log('Transfer gönderildi:', newTransfer);
      } catch (error) {
        console.error('Transfer gönderirken hata:', error);
        Alert.alert('Hata', 'Transfer gönderirken bir hata oluştu');
      }
    } else {
      Alert.alert('Hata', 'Lütfen en az bir ürün ekleyin');
      console.log('Ürün eklenmedi');
    }
  };

  const handleAcceptTransfer = async (index: number) => {
    const transfer = incomingTransfers[index];
  
    try {
      await axios.post('http://localhost:8000/api/transfers/accept', { id: transfer._id });
      
      setAcceptedTransfers(prevTransfers => [...prevTransfers, { ...transfer, status: 'accepted' }]);
      setIncomingTransfers(prevTransfers => prevTransfers.filter((_, i) => i !== index));
      Alert.alert('Transfer Kabul Edildi', `Kabul Edilen Ürünler: ${transfer.products.map(p => p.name).join(', ')}`);
      console.log('Transfer kabul edildi:', transfer);
    } catch (error) {
      console.error('Transfer kabul ederken hata:', error);
      Alert.alert('Hata', 'Transfer kabul ederken bir hata oluştu');
    }
  };
  

  const handleReportMissingProducts = async () => {
    const missing = incomingTransfers.flatMap(transfer => transfer.products.filter(product => checkedProducts[product.id]));
    if (missing.length > 0) {
      try {
        await axios.post('http://localhost:8000/api/transfers/missing', { products: missing });
        setMissingProducts(missing);
        Alert.alert('Eksik Ürünler Bildirildi', `Eksik Ürünler: ${missing.map(p => p.name).join(', ')}`);
        console.log('Eksik ürünler bildirildi:', missing);
      } catch (error) {
        console.error('Eksik ürünleri bildirirken hata:', error);
        Alert.alert('Hata', 'Eksik ürünleri bildirirken bir hata oluştu');
      }
    } else {
      Alert.alert('Hata', 'Lütfen eksik ürünleri seçin');
      console.log('Eksik ürün seçilmedi');
    }
  };

  const showDialog = (product: Product) => {
    setSelectedProduct(product);
    setSelectedQuantity(1);
    setSelectedSize(product.sizes[0]);
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
    setSelectedProduct(null);
  };

  const handleConfirmMissing = () => {
    if (selectedProduct && selectedQuantity > 0 && selectedSize) {
      const updatedMissingProducts = [...missingProducts, { ...selectedProduct, quantity: selectedQuantity, sizes: [selectedSize] }];
      setMissingProducts(updatedMissingProducts);
      Alert.alert('Eksik Ürün Eklendi', `Eksik Ürün: ${selectedProduct.name}, Miktar: ${selectedQuantity}, Beden: ${selectedSize}`);
      console.log('Eksik ürün eklendi:', selectedProduct, selectedQuantity, selectedSize);
      setCheckedProducts(prevCheckedProducts => ({
        ...prevCheckedProducts,
        [selectedProduct.id]: true,
      }));
    }
    hideDialog();
  };

  const handleCancelMissing = (index: number) => {
    const updatedMissingProducts = missingProducts.filter((_, i) => i !== index);
    setMissingProducts(updatedMissingProducts);
    Alert.alert('Eksik Ürün İptal Edildi');
    console.log('Eksik ürün iptal edildi:', missingProducts[index]);
  };

  const handleCheckboxChange = (productId: string) => {
    setCheckedProducts(prevCheckedProducts => ({
      ...prevCheckedProducts,
      [productId]: !prevCheckedProducts[productId],
    }));
  };

  const handleRemoveProduct = (productId: string) => {
    setProductList(prevList => prevList.filter(product => product.id !== productId));
  };

  const getRemainingQuantity = (product: Product): number => {
    const missingProduct = missingProducts.find(missing => missing.id === product.id);
    if (missingProduct) {
      return product.quantity - missingProduct.quantity;
    }
    return product.quantity;
  };

  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={hideDialog}>
          <Dialog.Title>Eksik Ürün Bildir</Dialog.Title>
          <Dialog.Content>
            <Text>{selectedProduct?.name}</Text>
            <TextInput
              label="Miktar"
              value={selectedQuantity.toString()}
              onChangeText={text => setSelectedQuantity(Number(text))}
              keyboardType="numeric"
            />
            <TextInput
              label="Beden"
              value={selectedSize}
              onChangeText={text => setSelectedSize(text)}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>İptal</Button>
            <Button onPress={handleConfirmMissing}>Onayla</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <TouchableOpacity onPress={() => setTransferType('outgoing')}>
            <Text style={[styles.transferType, transferType === 'outgoing' && styles.selectedTransferType]}>
              Giden Transfer
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTransferType('incoming')}>
            <Text style={[styles.transferType, transferType === 'incoming' && styles.selectedTransferType]}>
              Gelen Transfer
            </Text>
          </TouchableOpacity>
          {transferType === 'outgoing' && (
            <>
              <TextInput
                label="Barkod veya Ürün Kodu"
                value={barcodeData}
                onChangeText={text => setBarcodeData(text)}
                style={styles.input}
              />
              <Button mode="contained" style={styles.button} onPress={() => addProductToList(barcodeData)}>
                Ürün Ekle
              </Button>
              <Button mode="contained" style={styles.button} onPress={handleScanPress}>
                Barkod Tara
              </Button>
              {scanning && (
                <RNCamera
                  style={styles.camera}
                  onBarCodeRead={handleBarCodeScanned}
                  captureAudio={false}
                />
              )}
              <Card style={styles.card}>
                <Card.Title title="Gönderilecek Ürünler" />
                <Card.Content>
                  {productList.length > 0 ? (
                    productList.map((product, index) => (
                      <View key={index} style={styles.productContainer}>
                        <List.Item
                          title={product.name}
                          description={`Miktar: ${product.quantity}`}
                        />
                        <IconButton
                          icon="delete"
                          size={20}
                          onPress={() => handleRemoveProduct(product.id)}
                        />
                      </View>
                    ))
                  ) : (
                    <Text>Ürün yok</Text>
                  )}
                </Card.Content>
                <Card.Actions>
                  <Button mode="contained" onPress={handleSendTransfer}>Transfer Gönder</Button>
                </Card.Actions>
              </Card>
              <Card style={styles.card}>
                <Card.Title title="Giden Transferler" />
                <Card.Content>
                  {outgoingTransfers.length > 0 ? (
                    outgoingTransfers.map((transfer, index) => (
                      <Card key={index} style={styles.transferCard}>
                        <Card.Title title={`Transfer ${index + 1}`} />
                        <Card.Content>
                          {transfer.products.map((product, idx) => (
                            <List.Item
                              key={idx}
                              title={product.name}
                              description={`Miktar: ${product.quantity}`}
                            />
                          ))}
                        </Card.Content>
                        <Card.Actions>
                          <Text>Beklemede</Text>
                        </Card.Actions>
                      </Card>
                    ))
                  ) : (
                    <Text>Giden transfer yok</Text>
                  )}
                </Card.Content>
              </Card>
            </>
          )}
          {transferType === 'incoming' && (
            <Card style={styles.card}>
              <Card.Title title="Gelen Transferler" />
              <Card.Content>
                {incomingTransfers.length > 0 ? (
                  incomingTransfers.map((transfer, index) => (
                    <Card key={index} style={styles.transferCard}>
                      <Card.Title title={`Transfer ${index + 1}`} />
                      <Card.Content>
                        {transfer.products.map((product, idx) => (
                          <View key={idx} style={styles.checkboxContainer}>
                            <Checkbox
                              status={checkedProducts[product.id] ? 'checked' : 'unchecked'}
                              onPress={() => handleCheckboxChange(product.id)}
                            />
                            <List.Item
                              title={product.name}
                              description={`Miktar: ${getRemainingQuantity(product)} / ${product.quantity}`}
                            />
                          </View>
                        ))}
                      </Card.Content>
                      <Card.Actions>
                        <Button mode="contained" onPress={() => handleAcceptTransfer(index)}>Transferi Kabul Et</Button>
                        <Button mode="outlined" onPress={() => {
                          const checkedProduct = transfer.products.find(p => checkedProducts[p.id]);
                          if (checkedProduct) {
                            showDialog(checkedProduct);
                          } else {
                            Alert.alert('Hata', 'Lütfen eksik ürünü seçin');
                          }
                        }}>Eksik Ürünleri Bildir</Button>
                      </Card.Actions>
                    </Card>
                  ))
                ) : (
                  <Text>Gelen transfer yok</Text>
                )}
              </Card.Content>
            </Card>
          )}
          <Card style={styles.card}>
            <Card.Title title="Kabul Edilen Transferler" />
            <Card.Content>
              {acceptedTransfers.length > 0 ? (
                acceptedTransfers.map((transfer, index) => (
                  <Card key={index} style={styles.transferCard}>
                    <Card.Title title={`Transfer ${index + 1}`} />
                    <Card.Content>
                      {transfer.products.map((product, idx) => (
                        <List.Item
                          key={idx}
                          title={product.name}
                          description={`Miktar: ${product.quantity}`}
                        />
                      ))}
                    </Card.Content>
                  </Card>
                ))
              ) : (
                <Text>Kabul edilen transfer yok</Text>
              )}
            </Card.Content>
          </Card>
          {missingProducts.length > 0 && (
            <Card style={styles.card}>
              <Card.Title title="Eksik Ürünler" />
              <Card.Content>
                {missingProducts.map((product, index) => (
                  <View key={index} style={styles.productContainer}>
                    <List.Item
                      title={product.name}
                      description={`Miktar: ${product.quantity}, Beden: ${product.sizes[0]}`}
                    />
                    <Text>Beklemede</Text>
                    <IconButton
                      icon="delete"
                      size={20}
                      onPress={() => handleCancelMissing(index)}
                    />
                  </View>
                ))}
              </Card.Content>
            </Card>
          )}
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    width: '100%',
  },
  transferType: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: 'blue',
  },
  selectedTransferType: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  input: {
    marginVertical: 10,
    width: '100%',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 10,
    width: '80%',
  },
  camera: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    marginVertical: 10,
  },
  transferCard: {
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default TransferScreen;
