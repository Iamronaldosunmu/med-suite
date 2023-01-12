import { useRouter } from "next/router";
import styles from "./DashboardNav.module.css";

interface DashboardNavProps {
  children: JSX.Element;
  selectedNav: string;
}

const DashboardNavContainer: React.FC<DashboardNavProps> = ({
  children,
  selectedNav,
}) => {
  const router = useRouter();
  return (
    <main className={styles.pageContainer}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src="/icons/medsuitelogo.svg" />
          <p>Med Suite</p>
        </div>
        <div className={styles.navItemsContainer}>
          <div onClick={() => router.push("/admin/dashboard")}>
            <figure>
              <svg
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.99347 0.625H7.97528C8.67042 0.624994 9.23108 0.624988 9.68746 0.656126C10.1567 0.688143 10.5716 0.755639 10.9645 0.918381C11.9089 1.30956 12.6592 2.05985 13.0504 3.00422C13.2131 3.39711 13.2806 3.81209 13.3126 4.28129C13.3438 4.73767 13.3438 5.29833 13.3438 5.99347V7.97528C13.3438 8.67042 13.3438 9.23114 13.3126 9.68746C13.2806 10.1567 13.2131 10.5716 13.0504 10.9645C12.6592 11.9089 11.9089 12.6592 10.9645 13.0504C10.5716 13.2131 10.1567 13.2806 9.68746 13.3126C9.23108 13.3438 8.67042 13.3438 7.97528 13.3438H5.99347C5.29833 13.3438 4.73767 13.3438 4.28129 13.3126C3.81209 13.2806 3.39711 13.2131 3.00422 13.0504C2.05985 12.6592 1.30956 11.9089 0.918381 10.9645C0.755639 10.5716 0.688143 10.1567 0.656126 9.68746C0.624988 9.23108 0.624994 8.67042 0.625 7.97528V5.99347C0.624994 5.29833 0.624988 4.73767 0.656126 4.28129C0.688143 3.81209 0.755639 3.39711 0.918381 3.00422C1.30956 2.05985 2.05985 1.30956 3.00422 0.918381C3.39711 0.755639 3.81209 0.688143 4.28129 0.656126C4.73767 0.624988 5.29833 0.624994 5.99347 0.625ZM4.38622 2.1942C3.99547 2.22086 3.76792 2.27075 3.59419 2.34267C3.02757 2.57739 2.57739 3.02757 2.34267 3.59419C2.27075 3.76792 2.22086 3.99547 2.1942 4.38622C2.16709 4.78392 2.16669 5.29197 2.16669 6.02081V7.94794C2.16669 8.67678 2.16709 9.18483 2.1942 9.58253C2.22086 9.97328 2.27075 10.2008 2.34267 10.3746C2.57739 10.9412 3.02757 11.3914 3.59419 11.6261C3.76792 11.698 3.99547 11.7479 4.38622 11.7745C4.78392 11.8017 5.29197 11.8021 6.02081 11.8021H7.94794C8.67678 11.8021 9.18483 11.8017 9.58253 11.7745C9.97328 11.7479 10.2008 11.698 10.3746 11.6261C10.9412 11.3914 11.3914 10.9412 11.6261 10.3746C11.698 10.2008 11.7479 9.97328 11.7745 9.58253C11.8017 9.18483 11.8021 8.67678 11.8021 7.94794V6.02081C11.8021 5.29197 11.8017 4.78392 11.7745 4.38622C11.7479 3.99547 11.698 3.76792 11.6261 3.59419C11.3914 3.02757 10.9412 2.57739 10.3746 2.34267C10.2008 2.27075 9.97328 2.22086 9.58253 2.1942C9.18483 2.16709 8.67678 2.16669 7.94794 2.16669H6.02081C5.29197 2.16669 4.78392 2.16709 4.38622 2.1942ZM5.99347 15.6562H7.97528C8.67042 15.6562 9.23108 15.6562 9.68746 15.6874C10.1567 15.7194 10.5716 15.7869 10.9645 15.9496C11.9089 16.3408 12.6592 17.0911 13.0504 18.0355C13.2131 18.4284 13.2806 18.8433 13.3126 19.3125C13.3438 19.7689 13.3438 20.3296 13.3438 21.0247V23.0065C13.3438 23.7017 13.3438 24.2624 13.3126 24.7187C13.2806 25.1879 13.2131 25.6029 13.0504 25.9958C12.6592 26.9402 11.9089 27.6904 10.9645 28.0816C10.5716 28.2443 10.1567 28.3119 9.68746 28.3439C9.23108 28.375 8.67042 28.375 7.97528 28.375H5.99347C5.29833 28.375 4.73767 28.375 4.28129 28.3439C3.81209 28.3119 3.39711 28.2443 3.00422 28.0816C2.05985 27.6904 1.30956 26.9402 0.918381 25.9958C0.755639 25.6029 0.688143 25.1879 0.656126 24.7187C0.624988 24.2623 0.624994 23.7017 0.625 23.0065V21.0247C0.624994 20.3296 0.624988 19.7689 0.656126 19.3125C0.688143 18.8433 0.755639 18.4284 0.918381 18.0355C1.30956 17.0911 2.05985 16.3408 3.00422 15.9496C3.39711 15.7869 3.81209 15.7194 4.28129 15.6874C4.73767 15.6562 5.29833 15.6562 5.99347 15.6562ZM4.38622 17.2255C3.99547 17.2521 3.76792 17.302 3.59419 17.3739C3.02757 17.6086 2.57739 18.0588 2.34267 18.6254C2.27075 18.7992 2.22086 19.0267 2.1942 19.4175C2.16709 19.8152 2.16669 20.3232 2.16669 21.0521V22.9792C2.16669 23.708 2.16709 24.2161 2.1942 24.6138C2.22086 25.0045 2.27075 25.2321 2.34267 25.4058C2.57739 25.9724 3.02757 26.4226 3.59419 26.6573C3.76792 26.7293 3.99547 26.7791 4.38622 26.8058C4.78392 26.8329 5.29197 26.8333 6.02081 26.8333H7.94794C8.67678 26.8333 9.18483 26.8329 9.58253 26.8058C9.97328 26.7791 10.2008 26.7293 10.3746 26.6573C10.9412 26.4226 11.3914 25.9724 11.6261 25.4058C11.698 25.2321 11.7479 25.0045 11.7745 24.6138C11.8017 24.2161 11.8021 23.708 11.8021 22.9792V21.0521C11.8021 20.3232 11.8017 19.8152 11.7745 19.4175C11.7479 19.0267 11.698 18.7992 11.6261 18.6254C11.3914 18.0588 10.9412 17.6086 10.3746 17.3739C10.2008 17.302 9.97328 17.2521 9.58253 17.2255C9.18483 17.1983 8.67678 17.1979 7.94794 17.1979H6.02081C5.29197 17.1979 4.78392 17.1983 4.38622 17.2255ZM21.0247 0.625H23.0065C23.7017 0.624994 24.2623 0.624988 24.7187 0.656126C25.1879 0.688143 25.6029 0.755639 25.9958 0.918381C26.9402 1.30956 27.6904 2.05985 28.0816 3.00422C28.2443 3.39711 28.3119 3.81209 28.3439 4.28129C28.375 4.73767 28.375 5.29833 28.375 5.99347V7.97528C28.375 8.67042 28.375 9.23114 28.3439 9.68746C28.3119 10.1567 28.2443 10.5716 28.0816 10.9645C27.6904 11.9089 26.9402 12.6592 25.9958 13.0504C25.6029 13.2131 25.1879 13.2806 24.7187 13.3126C24.2623 13.3438 23.7017 13.3438 23.0065 13.3438H21.0247C20.3296 13.3438 19.7689 13.3438 19.3125 13.3126C18.8433 13.2806 18.4284 13.2131 18.0355 13.0504C17.0911 12.6592 16.3408 11.9089 15.9496 10.9645C15.7869 10.5716 15.7194 10.1567 15.6874 9.68746C15.6562 9.23108 15.6562 8.67042 15.6562 7.97528V5.99347C15.6562 5.29833 15.6562 4.73767 15.6874 4.28129C15.7194 3.81209 15.7869 3.39711 15.9496 3.00422C16.3408 2.05985 17.0911 1.30956 18.0355 0.918381C18.4284 0.755639 18.8433 0.688143 19.3125 0.656126C19.7689 0.624988 20.3296 0.624994 21.0247 0.625ZM19.4175 2.1942C19.0267 2.22086 18.7992 2.27075 18.6254 2.34267C18.0588 2.57739 17.6086 3.02757 17.3739 3.59419C17.302 3.76792 17.2521 3.99547 17.2255 4.38622C17.1983 4.78392 17.1979 5.29197 17.1979 6.02081V7.94794C17.1979 8.67678 17.1983 9.18483 17.2255 9.58253C17.2521 9.97328 17.302 10.2008 17.3739 10.3746C17.6086 10.9412 18.0588 11.3914 18.6254 11.6261C18.7992 11.698 19.0267 11.7479 19.4175 11.7745C19.8152 11.8017 20.3232 11.8021 21.0521 11.8021H22.9792C23.708 11.8021 24.2161 11.8017 24.6138 11.7745C25.0045 11.7479 25.2321 11.698 25.4058 11.6261C25.9724 11.3914 26.4226 10.9412 26.6573 10.3746C26.7293 10.2008 26.7791 9.97328 26.8058 9.58253C26.8329 9.18483 26.8333 8.67678 26.8333 7.94794V6.02081C26.8333 5.29197 26.8329 4.78392 26.8058 4.38622C26.7791 3.99547 26.7293 3.76792 26.6573 3.59419C26.4226 3.02757 25.9724 2.57739 25.4058 2.34267C25.2321 2.27075 25.0045 2.22086 24.6138 2.1942C24.2161 2.16709 23.708 2.16669 22.9792 2.16669H21.0521C20.3232 2.16669 19.8152 2.16709 19.4175 2.1942ZM21.0247 15.6562H23.0065C23.7017 15.6562 24.2623 15.6562 24.7187 15.6874C25.1879 15.7194 25.6029 15.7869 25.9958 15.9496C26.9402 16.3408 27.6904 17.0911 28.0816 18.0355C28.2443 18.4284 28.3119 18.8433 28.3439 19.3125C28.375 19.7689 28.375 20.3296 28.375 21.0247V23.0065C28.375 23.7017 28.375 24.2624 28.3439 24.7187C28.3119 25.1879 28.2443 25.6029 28.0816 25.9958C27.6904 26.9402 26.9402 27.6904 25.9958 28.0816C25.6029 28.2443 25.1879 28.3119 24.7187 28.3439C24.2623 28.375 23.7017 28.375 23.0065 28.375H21.0247C20.3296 28.375 19.7689 28.375 19.3125 28.3439C18.8433 28.3119 18.4284 28.2443 18.0355 28.0816C17.0911 27.6904 16.3408 26.9402 15.9496 25.9958C15.7869 25.6029 15.7194 25.1879 15.6874 24.7187C15.6562 24.2623 15.6562 23.7017 15.6562 23.0065V21.0247C15.6562 20.3296 15.6562 19.7689 15.6874 19.3125C15.7194 18.8433 15.7869 18.4284 15.9496 18.0355C16.3408 17.0911 17.0911 16.3408 18.0355 15.9496C18.4284 15.7869 18.8433 15.7194 19.3125 15.6874C19.7689 15.6562 20.3296 15.6562 21.0247 15.6562ZM19.4175 17.2255C19.0267 17.2521 18.7992 17.302 18.6254 17.3739C18.0588 17.6086 17.6086 18.0588 17.3739 18.6254C17.302 18.7992 17.2521 19.0267 17.2255 19.4175C17.1983 19.8152 17.1979 20.3232 17.1979 21.0521V22.9792C17.1979 23.708 17.1983 24.2161 17.2255 24.6138C17.2521 25.0045 17.302 25.2321 17.3739 25.4058C17.6086 25.9724 18.0588 26.4226 18.6254 26.6573C18.7992 26.7293 19.0267 26.7791 19.4175 26.8058C19.8152 26.8329 20.3232 26.8333 21.0521 26.8333H22.9792C23.708 26.8333 24.2161 26.8329 24.6138 26.8058C25.0045 26.7791 25.2321 26.7293 25.4058 26.6573C25.9724 26.4226 26.4226 25.9724 26.6573 25.4058C26.7293 25.2321 26.7791 25.0045 26.8058 24.6138C26.8329 24.2161 26.8333 23.708 26.8333 22.9792V21.0521C26.8333 20.3232 26.8329 19.8152 26.8058 19.4175C26.7791 19.0267 26.7293 18.7992 26.6573 18.6254C26.4226 18.0588 25.9724 17.6086 25.4058 17.3739C25.2321 17.302 25.0045 17.2521 24.6138 17.2255C24.2161 17.1983 23.708 17.1979 22.9792 17.1979H21.0521C20.3232 17.1979 19.8152 17.1983 19.4175 17.2255Z"
                  fill={selectedNav == "Dashboard" ? "#FF6B00" : "#D5D5D9"}
                />
              </svg>
            </figure>
            <p className={selectedNav == "Dashboard" ? styles.active : ""}>
              Dashboard
            </p>
          </div>
          <div onClick={() => router.push("/admin/dashboard/messages")}>
            <figure>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0007 13.1667C12.645 13.1667 13.1673 12.6443 13.1673 12C13.1673 11.3557 12.645 10.8333 12.0007 10.8333C11.3563 10.8333 10.834 11.3557 10.834 12C10.834 12.6443 11.3563 13.1667 12.0007 13.1667Z"
                  fill={selectedNav == "Messages" ? "#FF6B00" : "#D5D5D9"}
                />
                <path
                  d="M16.6667 13.1667C17.311 13.1667 17.8333 12.6443 17.8333 12C17.8333 11.3557 17.311 10.8333 16.6667 10.8333C16.0223 10.8333 15.5 11.3557 15.5 12C15.5 12.6443 16.0223 13.1667 16.6667 13.1667Z"
                  fill={selectedNav == "Messages" ? "#FF6B00" : "#D5D5D9"}
                />
                <path
                  d="M7.33366 13.1667C7.97799 13.1667 8.50033 12.6443 8.50033 12C8.50033 11.3557 7.97799 10.8333 7.33366 10.8333C6.68933 10.8333 6.16699 11.3557 6.16699 12C6.16699 12.6443 6.68933 13.1667 7.33366 13.1667Z"
                  fill={selectedNav == "Messages" ? "#FF6B00" : "#D5D5D9"}
                />
                <path
                  d="M20.2487 3.75167C18.3345 1.82492 15.808 0.626421 13.1048 0.362788C10.4016 0.0991548 7.69112 0.786913 5.44067 2.30749C3.19021 3.82807 1.54079 6.08618 0.776774 8.69252C0.0127568 11.2989 0.18202 14.0901 1.25538 16.585C1.36725 16.8169 1.40396 17.0779 1.36038 17.3317L0.333715 22.2667C0.294161 22.4559 0.302238 22.652 0.357221 22.8373C0.412204 23.0226 0.512369 23.1913 0.648715 23.3283C0.760487 23.4393 0.893568 23.5265 1.03994 23.5846C1.18631 23.6428 1.34294 23.6707 1.50038 23.6667H1.73372L6.72705 22.6633C6.98083 22.6328 7.23819 22.669 7.47371 22.7683C9.96863 23.8417 12.7599 24.011 15.3662 23.2469C17.9725 22.4829 20.2306 20.8335 21.7512 18.5831C23.2718 16.3326 23.9596 13.6221 23.6959 10.9189C23.4323 8.21576 22.2338 5.68926 20.307 3.77501L20.2487 3.75167ZM21.217 13.505C20.9889 14.898 20.4479 16.2211 19.6345 17.3747C18.8212 18.5284 17.7568 19.4825 16.5214 20.1653C15.286 20.8482 13.9118 21.2419 12.5023 21.3169C11.0928 21.3919 9.68458 21.1462 8.38371 20.5983C7.92235 20.4021 7.42673 20.299 6.92538 20.295C6.70637 20.2965 6.48786 20.316 6.27205 20.3533L2.98205 21.0183L3.64705 17.7283C3.77949 17.0158 3.69411 16.2799 3.40205 15.6167C2.85417 14.3158 2.60849 12.9076 2.68349 11.4981C2.75849 10.0885 3.15222 8.71438 3.83505 7.479C4.51788 6.24362 5.47202 5.1792 6.62566 4.36586C7.77931 3.55252 9.1024 3.01144 10.4954 2.78334C11.9575 2.54337 13.4558 2.65497 14.8663 3.10891C16.2767 3.56284 17.5589 4.34607 18.6066 5.3938C19.6543 6.44153 20.4375 7.72365 20.8915 9.13412C21.3454 10.5446 21.457 12.0429 21.217 13.505Z"
                  fill={selectedNav == "Messages" ? "#FF6B00" : "#D5D5D9"}
                />
              </svg>
            </figure>

            <p className={selectedNav == "Messages" ? styles.active : ""}>
              Messages
            </p>
          </div>
          <div onClick={() => router.push("/admin/dashboard/meetings")}>
            <figure>
              <svg
                width="24"
                height="14"
                viewBox="0 0 24 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.118 1.34167C22.9407 1.23927 22.7395 1.18536 22.5347 1.18536C22.3299 1.18536 22.1287 1.23927 21.9513 1.34167L17.833 3.37167C17.7998 2.46583 17.4164 1.60822 16.7636 0.979346C16.1108 0.350472 15.2395 -0.000608737 14.333 7.92349e-07H3.83301C2.90475 7.92349e-07 2.01451 0.36875 1.35813 1.02513C0.701757 1.6815 0.333008 2.57174 0.333008 3.5V10.5C0.333008 11.4283 0.701757 12.3185 1.35813 12.9749C2.01451 13.6313 2.90475 14 3.83301 14H14.333C15.2395 14.0006 16.1108 13.6495 16.7636 13.0207C17.4164 12.3918 17.7998 11.5342 17.833 10.6283L21.9863 12.705C22.1454 12.7865 22.321 12.8304 22.4997 12.8333C22.7181 12.834 22.9323 12.7734 23.118 12.6583C23.2861 12.5533 23.4247 12.4071 23.5207 12.2335C23.6166 12.06 23.6667 11.8649 23.6663 11.6667V2.33333C23.6667 2.13507 23.6166 1.93997 23.5207 1.76646C23.4247 1.59295 23.2861 1.44675 23.118 1.34167ZM15.4997 10.5C15.4997 10.8094 15.3768 11.1062 15.158 11.325C14.9392 11.5438 14.6424 11.6667 14.333 11.6667H3.83301C3.52359 11.6667 3.22684 11.5438 3.00805 11.325C2.78926 11.1062 2.66634 10.8094 2.66634 10.5V3.5C2.66634 3.19058 2.78926 2.89384 3.00805 2.67504C3.22684 2.45625 3.52359 2.33333 3.83301 2.33333H14.333C14.6424 2.33333 14.9392 2.45625 15.158 2.67504C15.3768 2.89384 15.4997 3.19058 15.4997 3.5V10.5ZM21.333 9.77667L17.833 8.02667V5.97333L21.333 4.22333V9.77667Z"
                  fill={selectedNav == "Meetings" ? "#FF6B00" : "#D5D5D9"}
                />
              </svg>
            </figure>

            <p className={selectedNav == "Meetings" ? styles.active : ""}>
              Meeetings
            </p>
          </div>
        </div>
      </nav>
      <section className={styles.contentContainer}>
        {children}
      </section>
    </main>
  );
};

export default DashboardNavContainer;