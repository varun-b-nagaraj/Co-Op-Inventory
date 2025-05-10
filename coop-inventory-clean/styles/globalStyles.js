import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Layout & Wrappers
  container: {
    flex: 1,
    backgroundColor: '#7a0c0c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inventoryContainer: {
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  headerBox: {
    backgroundColor: '#8c1a1a',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 30,
    width: '90%',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  inventoryListPadding: {
    paddingBottom: 20,
  },

  // Typography
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 0,
  },
  textCenter: {
    textAlign: 'center',
  },

  // Inventory Items
  itemBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 15,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#741414',
  },
  itemSub: {
    fontSize: 14,
    color: '#444',
  },

  // Search
  searchWrapper: {
    width: '90%',
    position: 'absolute',
    bottom: 20,
    right: 0,
    alignSelf: 'flex-end',
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333',
  },

  // Icons
  iconWrapper: {
    backgroundColor: '#8c1a1a',
    borderRadius: 100,
    padding: 30,
    marginBottom: 30,
  },

  // Buttons
  buttonPrimary: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    width: '90%',
    justifyContent: 'center',
  },
  buttonSecondary: {
    flexDirection: 'row',
    backgroundColor: '#f1eaea',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    width: '90%',
    justifyContent: 'center',
  },
  buttonTextPrimary: {
    color: '#7a0c0c',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#7a0c0c',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  searchFloatingWrapper: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#8c1a1a',
    borderRadius: 30,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  searchInputFloating: {
    width: 220,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#333',
  },

});
