import Button from "@/components/shared/Button";
import Flex from "@/components/shared/Flex";
import Spacing from "@/components/shared/Spacing";
import useGoogleSignin from "@/hooks/useGoogleSignin";

function SigninPage() {
  const { signin } = useGoogleSignin();

  return (
    <Flex direction="column" align="center" style={{ padding: 24 }}>
      <Spacing size={100} />
      <img
        src="https://cdn2.iconfinder.com/data/icons/custom-ios-14-1/60/Photos-512.png"
        alt="logo"
        width={200}
        height={200}
      />
      <Spacing size={50} />
      <Button size="medium" onClick={signin}>
        <Flex align="center" justify="center">
          <img
            src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-512.png"
            alt="google-logo"
            width={20}
            height={20}
          />
          <Spacing direction="horizontal" size={5} />
          Google 로그인
        </Flex>
      </Button>
    </Flex>
  );
}

export default SigninPage;
