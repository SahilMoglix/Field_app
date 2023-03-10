import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import {
  PermissionsAndroid,
  View,
  Text,
  Platform,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Contacts from "react-native-contacts";
//import { Icon } from "react-native-elements";
import Dimension from "../../Theme/Dimension";
import styles from "./style";

const ContactScreen = (props) => {
  const flatListRef = React.useRef();
  const [contacts, setContacts] = useState([]);
  const [searchValue, setSearch] = useState("");
  const [FilterList, setFilter] = useState([]);
  const [syncPhone, setSyncPhone] = useState(false);
  const [contactsLoader, setContactsLoader] = useState(false);
  useEffect(() => {
    setContactsLoader(true);
    getPhoneContacts();
  }, []);

  const getPhoneContacts = () => {
    if (Platform.OS == "android") {
      try {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
          .then((res) => {
            console.log("Permission: ", res);
            readContacts();
          })
          .catch((error) => {
            console.error("Permission error: ", error);
          });
      } catch (err) {
        setContactsLoader(false);
        console.log("err", err);
      }
    } else {
      readContacts();
    }
  };

  const readContacts = () => {
    Contacts.getAll()
      .then((contacts) => {
        console.log("all contacts list", contacts);
        setContacts(contacts);
        setContactsLoader(false);
      })
      .catch((e) => {
        setContactsLoader(false);
        console.log(e);
      });
  };
  const renderItem = ({ item, index }) => {
    return <Contact contact={item} />;
  };
  const keyExtractor = (item, idx) => {
    return item?.recordID?.toString() || idx.toString();
  };

  const onSearchText = (item) => {
    console.log(searchValue)
    setSearch(item);
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
    let filteredData = contacts.filter(function (val) {
      console.log(searchValue)
      if (
        val.displayName.toLowerCase().includes(item.toLowerCase()) ||
        (val.company && val.company.toLowerCase().includes(item.toLowerCase()))
      ) {
        return val;
      }
    });
    setFilter(filteredData);
  };

  const Contact = ({ contact }) => {
    return (
      <View style={styles.contactCon}>
        <View style={styles.placeholder}>
          {contact?.hasThumbnail ? (
            <Image
              source={{ uri: contact?.thumbnailPath }}
              style={{ width: 48, height: 48, borderRadius: 48 }}
            />
          ) : (
            <Text style={styles.txt}>{contact?.givenName[0]}</Text>
          )}
        </View>

        <View style={styles.contactDat}>
          <Text style={styles.name}>
            {contact?.givenName}{" "}
            {contact?.middleName && contact.middleName + " "}
            {contact?.familyName}
          </Text>
          <Text style={styles.phoneNumber}>
            {contact?.phoneNumbers[0]?.number}
          </Text>
          <Text style={styles.name}>{contact?.company}</Text>
        </View>
      </View>
    );
  };

  const getContactsData = () => {
    let mutateContacts = ([...contacts] || []).sort((a, b) => {
      if (a.displayName > b.displayName) {
        return 1;
      }
      if (a.displayName < b.displayName) {
        return -1;
      }
      return 0;
    });
    return mutateContacts;
  };

  return (
    <View
      style={{
        flex: 1,
        marginTop: Dimension.margin40,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.headerWrap}>
        <View style={styles.TopHeader}>
          <Text style={styles.headingTxt}>Contacts</Text>
        </View>
        <View style={styles.HeaderForBtn}>
          <View style={styles.BtnWrap}>
            <TouchableOpacity style={styles.TopBtn}>
              <Text style={styles.BtnTxt}>Focused</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ActiveTopBtn}>
              <Text style={styles.ActiveBtnTxt}>Phone</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.searchWraper}>
          <View style={{ flex: 4 }}>
            <TextInput
              placeholder={"Search by name, company"}
              returnKeyType={"search"}
              onChangeText={(e)=>onSearchText(e)}
              defaultValue={searchValue}
              ellipsizeMode="tail"
              placeholderTextColor={"#8E8E93"}
              numberOfLines={1}
              clearButtonMode="always"
              style={styles.SearchInputCss}
            ></TextInput>
          </View>
          {searchValue.length > 0 && <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={()=>setSearch("")} activeOpacity={0.5}>
            <Image
              source={require("../../assets/images/cross-icon.png")}
              style={{ width: 25, height: 25 }}
            />
            </TouchableOpacity>
          </View>}
        </View>
      </View>
      {contactsLoader ? (
        <ActivityIndicator
          color={"red"}
          size={"large"}
          style={{
            marginTop: 100,
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        />
      ) : (
        <FlashList
          ref={flatListRef}
          data={
            searchValue && searchValue.length > 0
              ? FilterList
              : getContactsData()
          }
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          //style={styles.list}
        />
      )}
    </View>
  );
};

export default ContactScreen;
