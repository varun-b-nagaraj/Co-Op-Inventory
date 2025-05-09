import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7a0c0c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconWrapper: {
    backgroundColor: '#8c1a1a',
    borderRadius: 100,
    padding: 30,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 40,
  },
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
});
