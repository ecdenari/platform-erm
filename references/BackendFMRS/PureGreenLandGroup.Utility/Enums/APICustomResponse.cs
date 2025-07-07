namespace PureGreenLandGroup.Utility.Enums
{
    public enum APICustomResponse
    {
        //for user login
        UnAuthorized,
        Authorized,
        InvalidPassword,
        InvalidUser,
        DeactivatedUser,
        //Reset password
        ResetLinkSent,
        ResetLinkAlreadySent,
        PasswordChanged,
        Error
    }
}
