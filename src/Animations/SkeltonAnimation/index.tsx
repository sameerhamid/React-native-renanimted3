import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Skeleton } from "moti/skeleton";
import EvilIcons from "@expo/vector-icons/EvilIcons";
interface ContactsInfo {
  name: string;
  email: string;
}
const SkeltonAnimation = () => {
  const [contacts, setContacts] = useState<ContactsInfo[] | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchContacts = useCallback(async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    setContacts(data);
  }, []);

  useEffect(() => {
    fetchContacts();
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  const handleRefreshBtnPress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  };

  // const LoadingVW = (): React.ReactElement => {
  //     return <Skeleton>

  //     </Skeleton>
  // }
  const SkeltonProps = {
    colorMode: "light",
    backgroundColor: "#cccccc",
    transition: {
      type: "timing",
      duration: 2000,
    },
  } as const;

  const RenderContactListItem = ({ contact }): React.ReactElement => {
    return (
      <View style={styles.listItem}>
        <Skeleton.Group show={loading}>
          <Skeleton width={70} height={70} radius={70 / 2} {...SkeltonProps}>
            <View style={styles.profileImg}>
              <Text style={styles.profileText}>{contact.name[0]}</Text>
            </View>
          </Skeleton>
          <View style={styles.listItemTextContainer}>
            <Skeleton width={280} {...SkeltonProps}>
              <Text style={styles.headingTxt}>{contact.name}</Text>
            </Skeleton>
            <Skeleton width={280} {...SkeltonProps}>
              <Text style={styles.itemText}>{contact.email}</Text>
            </Skeleton>
          </View>
        </Skeleton.Group>
      </View>
    );
  };

  return (
    <View style={styles.conatiner}>
      <FlatList
        data={contacts}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: 1,
                width: "100%",
                backgroundColor: "#ccc",
              }}
            />
          );
        }}
        keyExtractor={({ email }) => email}
        renderItem={({ item }) => {
          return <RenderContactListItem contact={item} />;
        }}
      />

      <TouchableOpacity
        style={styles.refreshBtn}
        onPress={handleRefreshBtnPress}
      >
        <EvilIcons name="refresh" size={50} />
      </TouchableOpacity>
    </View>
  );
};

export default SkeltonAnimation;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  listItem: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    columnGap: 20,
    alignItems: "center",
    marginHorizontal: 22,
  },
  listItemTextContainer: {
    rowGap: 6,
  },
  headingTxt: {
    fontSize: 25,
  },
  itemText: {
    fontSize: 20,
  },

  profileImg: {
    width: 70,
    height: 70,
    backgroundColor: "teal",
    borderRadius: 70 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  profileText: {
    fontSize: 38,
    color: "#fff",
  },
  refreshBtn: {
    position: "absolute",
    bottom: 0,
    right: 20,
    width: 80,
    height: 80,
    backgroundColor: "#22abc66c",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
  },
});
