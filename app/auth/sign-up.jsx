import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet, Alert } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter, Stack } from 'expo-router'
import Color from '../../constant/Color'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [name, setName] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) return

    if (!name.trim()) {
      Alert.alert('Error', 'Please enter your name')
      return
    }

    if (!emailAddress.trim()) {
      Alert.alert('Error', 'Please enter your email')
      return
    }

    if (!password.trim()) {
      Alert.alert('Error', 'Please enter a password')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Error', 'Passwords do not match')
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName: name
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (err) {
      Alert.alert('Sign Up Error', err.message || 'Unable to create account')
      console.error('Signup error:', err)
    }
  }

  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('(home)')
      } else {
        Alert.alert('Verification Error', 'Unable to complete verification')
      }
    } catch (err) {
      Alert.alert('Verification Failed', err.message || 'Verification process failed')
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Stack.Screen
          options={{
            headerShown: false,
            animation: "slide_from_right",
          }}
        />
        <View style={styles.container}>
          <Text style={styles.textHeader}>Verify Email</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={code}
              placeholder="Enter verification code"
              placeholderTextColor={Color.GRAY}
              onChangeText={setCode}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onVerifyPress}>
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.textHeader}>Sign Up</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            placeholder="Enter name"
            placeholderTextColor={Color.GRAY}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            placeholderTextColor={Color.GRAY}
            onChangeText={setEmailAddress}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={password}
            placeholder="Enter password"
            placeholderTextColor={Color.GRAY}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={confirmPassword}
            placeholder="Confirm password"
            placeholderTextColor={Color.GRAY}
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onSignUpPress}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => router.push("/auth/sign-in")}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: Color.PRIMARY,
  },
  inputContainer: {
    marginBottom: 15,
  },
  textInput: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: '#e6f2ff',
    borderColor: '#cce0ff',
    fontSize: 16,
    color: '#000',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: Color.PRIMARY,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
    width: '70%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})