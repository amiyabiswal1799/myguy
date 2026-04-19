import Common "common";

module {
  public type PersonalityType = {
    #friendly;
    #romantic;
    #mentor;
    #businessCoach;
  };

  public type AICompanion = {
    id : Common.CompanionId;
    ownerPrincipal : Common.UserId;
    name : Text;
    personalityType : PersonalityType;
    customTraits : Text;
    createdAt : Common.Timestamp;
  };

  public type CreateCompanionInput = {
    name : Text;
    personalityType : PersonalityType;
    customTraits : Text;
  };

  public type Message = {
    id : Common.MessageId;
    companionId : Common.CompanionId;
    role : { #user; #assistant };
    content : Text;
    timestamp : Common.Timestamp;
  };
};
