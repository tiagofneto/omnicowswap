import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react"
import { useRef } from "react"

interface ErrorAlertProps {
  error: string
  close: () => void
}

const ErrorAlert = (props: ErrorAlertProps) => {
  const cancelRef = useRef()

  return (
    <AlertDialog
      isOpen={Boolean(props.error)}
      leastDestructiveRef={cancelRef as any}
      onClose={props.close}
      isCentered
      motionPreset="scale"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Error
          </AlertDialogHeader>

          <AlertDialogBody>{props.error}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef as any} onClick={props.close}>
              Ok
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default ErrorAlert
