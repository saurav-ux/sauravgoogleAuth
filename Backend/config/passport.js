import Googlestr from "passport-google-oauth20";
const GoogleStrategy = Googlestr.Strategy;
import UserData from "../Models/User.js";
export default function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "795827603723-9fqv144sl106punjk459kuj76lc8jdvu.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:5001/auth/google/callback",
        scope: ["email", "profile"],
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };
        try {
          let user = await UserData.findOne({ googleId: profile.id });
          if (user) {
            console.log("Accepted");
            done(null, user);
          } else {
            user = await UserData.create(newUser);
            done(null, user);
          }
        } catch (error) {
          console.error("errrorr", error);
        }
        // console.log("profil",profile)
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    UserData.findById(id)
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error, null);
      });
  });
}
